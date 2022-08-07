interface props {
  children: React.ReactNode
}

const Layout = ({ children }: props) => {
  return <div className="h-screen w-screen flex">{children}</div>
}

export default Layout
