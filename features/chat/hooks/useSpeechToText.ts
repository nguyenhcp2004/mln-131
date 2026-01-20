import { useState, useEffect, useCallback, useRef } from "react";

export function useSpeechToText() {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    // Check if browser supports Speech Recognition
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      setIsSupported(true);

      const recognition = new SpeechRecognition();
      recognition.continuous = true; // Tiếp tục nghe
      recognition.interimResults = true; // Hiển thị kết quả tạm thời
      recognition.lang = "vi-VN"; // Tiếng Việt
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        console.log("Speech recognition started");
      };

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let interimText = "";
        let finalText = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          const text = result[0].transcript;

          if (result.isFinal) {
            finalText += text + " ";
          } else {
            interimText += text;
          }
        }

        if (finalText) {
          setTranscript((prev) => prev + finalText);
          setInterimTranscript("");
        } else {
          setInterimTranscript(interimText);
        }
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error("Speech recognition error:", event.error);

        // Xử lý các lỗi khác nhau
        if (event.error === "no-speech") {
          console.log("No speech detected");
        } else if (event.error === "audio-capture") {
          alert(
            "Không thể truy cập microphone. Vui lòng kiểm tra quyền truy cập."
          );
        } else if (event.error === "not-allowed") {
          alert(
            "Bạn cần cấp quyền truy cập microphone để sử dụng tính năng này."
          );
        }

        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
        console.log("Speech recognition ended");
      };

      recognitionRef.current = recognition;
    } else {
      setIsSupported(false);
      console.warn("Speech Recognition not supported in this browser");
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startListening = useCallback(() => {
    if (!isSupported || !recognitionRef.current) {
      alert("Trình duyệt không hỗ trợ nhận diện giọng nói");
      return;
    }

    try {
      // Reset transcript khi bắt đầu mới
      setTranscript("");
      setInterimTranscript("");
      recognitionRef.current.start();
    } catch (error) {
      console.error("Error starting recognition:", error);
      // Nếu đang chạy rồi, stop và start lại
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        setTimeout(() => {
          recognitionRef.current?.start();
        }, 100);
      }
    }
  }, [isSupported]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  }, []);

  const resetTranscript = useCallback(() => {
    setTranscript("");
    setInterimTranscript("");
  }, []);

  // Combine final and interim transcript
  const fullTranscript = transcript + interimTranscript;

  return {
    isListening,
    isSupported,
    transcript: fullTranscript.trim(),
    finalTranscript: transcript.trim(),
    interimTranscript: interimTranscript.trim(),
    startListening,
    stopListening,
    resetTranscript,
  };
}
