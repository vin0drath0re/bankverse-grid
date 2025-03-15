
import { createRoot } from 'react-dom/client'
import { AppRouter } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { Layout } from './app/layout'
import './index.css'

createRoot(document.getElementById("root")!).render(<Layout />);
