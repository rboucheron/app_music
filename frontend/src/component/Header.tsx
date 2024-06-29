function Header() {
  return (
    <div className="sticky top-0 grid w-full grid-cols-3 gap-4 p-2">
      <div className="rounded-xl bg-black"></div>
      <div className="rounded-xl bg-black"></div>
      <div className="flex items-center justify-end rounded-xl bg-black pb-2 pl-2 pr-2 pt-2">
        <div className="cursor-pointer rounded-lg border-2 border-[#ff2f01] bg-[#ff2f01] p-2 pl-4 pr-4 text-center text-lg font-semibold text-white transition-all">
          Connexion
        </div>
      </div>
    </div>
  );
}

export default Header;
