import { RoomJoin } from "@/components/RoomJoin";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">🎵 Group Listen</h1>
        <p className="text-xl text-muted-foreground">
          Listen to music together with friends
        </p>
      </div>
      <RoomJoin />
    </div>
  );
};

export default Index;