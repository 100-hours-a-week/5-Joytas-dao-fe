import Header from './Header'
import Footer from './Footer'
import { Main, ChildrenDiv } from './LayoutStyles'

export default function Layout({ children }: { children: JSX.Element }) {
  return (
    <Main>
      <Header />
      <ChildrenDiv>{children}</ChildrenDiv>
      <Footer />
    </Main>
  )
}
