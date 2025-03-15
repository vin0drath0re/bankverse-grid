
import { createRoot } from 'react-dom/client'
import RootLayout from './app/layout'
import Home from './app/page'
import './index.css'
import './lib/fonts.css'

createRoot(document.getElementById("root")!).render(
  <RootLayout>
    <Home />
  </RootLayout>
);
