const SmallResolution = () => {
  return (
    <section
      style={{
        backgroundImage: `url(/assets/svg/background.svg)`,
        backgroundSize: "100%",
      }}>
      <div className="w-screen h-screen flex items-center justify-center bg-red-950 bg-opacity-60">
        <h1 className="text-white font-semibold text-center px-5">
          Aplikasi ini hanya bisa dibuka untuk device Tablet dan Desktop
        </h1>
      </div>
    </section>
  );
};

export default SmallResolution;
