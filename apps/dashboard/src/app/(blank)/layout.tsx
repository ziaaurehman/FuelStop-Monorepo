export default function BlankLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white overflow-hidden">
      <div className="relative w-full h-full flex items-center justify-center overflow-y-auto overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}
