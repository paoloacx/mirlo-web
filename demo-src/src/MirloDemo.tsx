import { Stage, Phone, Expand, type Act } from './kit'
import './kit/stageshow.css'
import './mirlo.css'

// Every string and icon below comes from the real mirloapps.es home / app pages.
// No invented screens: an app "opens" onto its icon, name, tagline and the real tags.
type AppInfo = { name: string; icon: string; tagline: string; chips: string[] }
const APPS: AppInfo[] = [
  { name: 'Poetry companion', icon: 'poetry', tagline: 'Poetry writing app for iPhone and iPad', chips: ['Syllable Meter', 'Rhyme Finder', 'iCloud Sync'] },
  { name: 'Weather for humans', icon: 'weather', tagline: 'Made to understand weather', chips: ['Plain Language', 'Climate Context', 'Home Widgets'] },
  { name: '24h Routines', icon: 'routines', tagline: 'Minimalist routines planner', chips: ['iPhone', 'iPad', 'Watch'] },
  { name: "I'm OK", icon: 'imok', tagline: 'Peace of mind for families', chips: ['Zero Servers', 'iCloud'] },
  { name: 'Wishlist Genie', icon: 'wishlist', tagline: 'Smart Shopping & Gift Wishlist', chips: ['Share Extension', 'Sync'] },
  { name: 'yeah!', icon: 'yeah', tagline: 'Check-in & Log Places', chips: ['Private Map', 'Check-ins'] },
  { name: 'Ephemerides', icon: 'ephemerides', tagline: 'Calendar, diary and memories', chips: ['On This Day', 'Diary'] },
  { name: 'A Sun in Your Pocket', icon: 'sun', tagline: 'Sun & Moon Tracker', chips: ['Solar Path', 'Moon'] },
  { name: 'Balizas España', icon: 'balizas', tagline: 'Mapa V-16 en vivo', chips: [] },
  { name: 'Embalses España', icon: 'embalses', tagline: 'Información embalses, pantanos', chips: [] },
  { name: 'My Health Keeper', icon: 'health', tagline: 'Personal health ledger & AI companion', chips: ['Report OCR', 'Med Schedules'] },
  { name: 'Leisure Shelf', icon: 'leisure', tagline: 'Books, movies, games & music', chips: ['2.5D Shelf', '100% Private'] },
]
const SHORT: Record<number, string> = { 1: 'Weather', 2: '24h', 7: 'Sun', 9: 'Embalses', 10: 'Health', 6: 'Ephemerides' }
const src = (i: number) => `/assets/icons/${APPS[i].icon}.webp`

// Taps: Weather, Ephemerides, Poetry. Order alternates rows so the eye travels.
const TAPS = [1, 6, 0]
type S = { open: boolean; app: number }
const START: S = { open: false, app: TAPS[0] }

const COLS = 4, SIZE = 72, GAP = (402 - 48 - COLS * SIZE) / (COLS - 1)
const pos = (i: number) => ({ left: 24 + (i % COLS) * (SIZE + GAP), top: 124 + Math.floor(i / COLS) * 130 })

const script = async (a: Act<S>) => {
  await a.wait(1000)
  for (const i of TAPS) {
    await a.click(`icon-${i}`)
    a.put({ open: true, app: i })
    await a.wait(2300)
    await a.click('home')
    a.put({ open: false })
    await a.wait(900)
  }
}

export function MirloDemo() {
  return (
    <div className="mw">
      <Stage<S>
        width={400} height={520}
        compact={{ below: 400, width: 358, height: 520 }}
        initial={START} poster={{ open: true, app: 1 }}
        script={script}
        cursor={{ at: { x: 330, y: 470 }, style: 'touch' }}
      >
        {(s, rect, layout) => {
          const app = APPS[s.app]
          return (
            <>
              <div className="mw-wash" />
              <Phone width={layout === 'compact' ? 326 : 300} className="mw-phone">
                <div className="mw-home" data-back={s.open || undefined}>
                  {APPS.map((p, i) => (
                    <span key={i} className="mw-icon" style={pos(i)} data-target={`icon-${i}`}>
                      <img src={src(i)} alt="" /><span>{SHORT[i] ?? p.name}</span>
                    </span>
                  ))}
                </div>
                <Expand
                  open={s.open} from={rect(`icon-${s.app}`)} radius={16}
                  face={<div className="mw-face"><img src={src(s.app)} alt="" /></div>}
                  style={{ ['--ss-expand-bg' as string]: '#fff' }}
                >
                  <div className="mw-app" data-target="home">
                    <img src={src(s.app)} alt="" />
                    <h2>{app.name}</h2>
                    <p>{app.tagline}</p>
                    <div className="mw-chips">{app.chips.map((c) => <span key={c}>{c}</span>)}</div>
                    <div className="mw-priv">Your data stays on your iPhone.</div>
                  </div>
                </Expand>
              </Phone>
            </>
          )
        }}
      </Stage>
    </div>
  )
}
