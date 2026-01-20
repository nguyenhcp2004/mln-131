create extension if not exists vector;

create table if not exists documents (
  id bigserial primary key,
  content text not null,
  metadata jsonb default '{}'::jsonb,
  embedding vector(1536) not null
);

create index if not exists documents_embedding_idx
on documents
using ivfflat (embedding vector_cosine_ops)
with (lists = 100);

create or replace function match_documents(
  query_embedding vector(768),
  match_count int default 5,
  filter jsonb default '{}'::jsonb
)
returns table(
  id bigint,
  content text,
  metadata jsonb,
  similarity float
)
language sql stable as $$
  select
    d.id,
    d.content,
    d.metadata,
    1 - (d.embedding <=> query_embedding) as similarity
  from documents d
  where d.metadata @> filter
  order by d.embedding <=> query_embedding
  limit match_count;
$$;
