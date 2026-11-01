import { createRoot } from 'react-dom/client'
import './preview.css'
import { MirloDemo } from './MirloDemo'

// Preview-only page: mimics the home hero so the demo can be judged beside copy.
// It is NOT the real home and nothing here is shipped.
function Preview() {
  return (
    <main className="pv">
      <section className="pv-hero">
        <div className="pv-copy">
          <span className="pv-eyebrow">Independent iOS Studio</span>
          <h1>Mirlo apps<span>.</span></h1>
          <p>Handcrafted software with personality and character. Designed to be useful, private, and efficient.</p>
        </div>
        <div className="pv-demo"><MirloDemo /></div>
      </section>
      <p className="pv-note">Prueba local de Stageshow · no forma parte de la web</p>
    </main>
  )
}
createRoot(document.getElementById('root')!).render(<Preview />)
