import { createRoot } from 'react-dom/client'
import { MirloDemo } from './MirloDemo'

// Production entry: mounts the demo into the home's hero.
const el = document.getElementById('mirlo-demo')
if (el) {
  el.replaceChildren()
  el.setAttribute('data-ready', '')
  createRoot(el).render(<MirloDemo />)
}
