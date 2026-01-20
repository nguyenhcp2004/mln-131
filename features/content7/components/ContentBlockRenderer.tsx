import ParagraphBlock from "./ParagraphBlock";
import QuoteBlock from "./QuoteBlock";
import SubtitleBlock from "./SubtitleBlock";
import CardsBlock from "./CardsBlock";
import NumberedCardsBlock from "./NumberedCardsBlock";
import ListBlock from "./ListBlock";
import HighlightBoxBlock from "./HighlightBoxBlock";

interface ContentBlock {
    type: string;
    content?: string;
    text?: string;
    author?: string;
    cards?: any[];
    items?: any[];
    title?: string;
    style?: string;
}

interface ContentBlockRendererProps {
    block: ContentBlock;
}

export default function ContentBlockRenderer({ block }: ContentBlockRendererProps) {
    switch (block.type) {
        case "paragraph":
            return <ParagraphBlock content={block.content || ""} />;

        case "quote":
            return (
                <QuoteBlock
                    content={block.content || ""}
                    author={block.author}
                />
            );

        case "subtitle":
            return <SubtitleBlock text={block.text || ""} />;

        case "cards":
            return <CardsBlock cards={block.cards || []} />;

        case "numberedCards":
            return <NumberedCardsBlock items={block.items || []} />;

        case "list":
            return (
                <ListBlock
                    items={block.items || []}
                    style={block.style as "check" | "number" | "bullet"}
                />
            );

        case "highlightBox":
            return (
                <HighlightBoxBlock
                    title={block.title || ""}
                    items={block.items || []}
                />
            );

        default:
            return null;
    }
}

