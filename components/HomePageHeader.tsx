const HomePageHeader = () => {
  return (
    <header className="flex justify-center gap-8 sm:gap-12 text-white font-bold sm:text-2xl text-[6vw] py-10 mb-14 md:mb-40">
      <a
        className="hover:underline"
        target="_blank"
        rel="noreferrer"
        href="https://github.com/Eugee29"
      >
        GitHub
      </a>
      <a
        className="hover:underline"
        target="_blank"
        rel="noreferrer"
        href="https://www.linkedin.com/in/uri-gruda/"
      >
        LinkedIn
      </a>
      <a
        className="hover:underline"
        target="_blank"
        rel="noreferrer"
        href="https://github.com/Eugee29/discord-clone"
      >
        Source Code
      </a>
    </header>
  )
}
export default HomePageHeader
