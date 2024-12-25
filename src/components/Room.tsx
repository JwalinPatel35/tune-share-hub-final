import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { YouTubePlayer } from "./YouTubePlayer";
import { ScrollArea } from "@/components/ui/scroll-area";

interface QueueItem {
  id: string;
  title: string;
  url: string;
}

export function Room() {
  const { roomId } = useParams();
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [currentUrl, setCurrentUrl] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [newSong, setNewSong] = useState("");

  const addToQueue = () => {
    if (newSong.trim()) {
      // Extract video ID from URL
      const videoId = newSong.split("v=")[1]?.split("&")[0];
      if (videoId) {
        const newItem: QueueItem = {
          id: videoId,
          title: `Song ${queue.length + 1}`,
          url: newSong,
        };
        setQueue([...queue, newItem]);
        setNewSong("");
        if (!currentUrl) {
          setCurrentUrl(newItem.url);
        }
      }
    }
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, `User: ${newMessage}`]);
      setNewMessage("");
    }
  };

  const onVideoEnd = () => {
    if (queue.length > 1) {
      const newQueue = queue.slice(1);
      setQueue(newQueue);
      setCurrentUrl(newQueue[0].url);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 flex flex-col md:flex-row gap-4 p-4">
        <div className="flex-1">
          <div className="rounded-lg overflow-hidden bg-black aspect-video">
            {currentUrl && (
              <YouTubePlayer url={currentUrl} onEnded={onVideoEnd} />
            )}
          </div>
          <div className="mt-4 flex gap-2">
            <Input
              type="text"
              placeholder="Paste YouTube URL"
              value={newSong}
              onChange={(e) => setNewSong(e.target.value)}
            />
            <Button onClick={addToQueue}>Add to Queue</Button>
          </div>
        </div>
        
        <div className="w-full md:w-80 flex flex-col gap-4">
          <div className="flex-1 bg-muted rounded-lg p-4">
            <h3 className="font-bold mb-2">Queue</h3>
            <ScrollArea className="h-[200px]">
              {queue.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-center gap-2 p-2 hover:bg-accent rounded"
                >
                  <span className="text-sm text-muted-foreground">
                    {index + 1}.
                  </span>
                  <span className="flex-1 truncate">{item.title}</span>
                </div>
              ))}
            </ScrollArea>
          </div>
          
          <div className="flex-1 bg-muted rounded-lg p-4">
            <h3 className="font-bold mb-2">Chat</h3>
            <ScrollArea className="h-[200px] mb-4">
              {messages.map((msg, i) => (
                <div key={i} className="p-2">
                  {msg}
                </div>
              ))}
            </ScrollArea>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Type a message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              />
              <Button onClick={sendMessage}>Send</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}