import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

export function RoomJoin() {
  const [roomCode, setRoomCode] = useState("");
  const navigate = useNavigate();

  const handleJoin = () => {
    if (roomCode.trim()) {
      navigate(`/room/${roomCode}`);
    }
  };

  const handleCreate = () => {
    const newRoomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    navigate(`/room/${newRoomCode}`);
  };

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <div className="flex flex-col items-center gap-4 w-full max-w-sm">
        <h2 className="text-2xl font-bold">Join a Room</h2>
        <Input
          type="text"
          placeholder="Enter room code"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
          className="w-full"
        />
        <Button onClick={handleJoin} className="w-full">
          Join Room
        </Button>
      </div>
      <div className="flex flex-col items-center gap-4 w-full max-w-sm">
        <h2 className="text-2xl font-bold">Or Create a New Room</h2>
        <Button onClick={handleCreate} variant="secondary" className="w-full">
          Create Room
        </Button>
      </div>
    </div>
  );
}