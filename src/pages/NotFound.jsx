import { Link } from 'react-router-dom'
import Icon from '../components/Icons'

export default function NotFound() {
  return (
    <section className="bg-shell py-24 lg:py-32">
      <div className="container text-center">
        <span className="mx-auto grid h-20 w-20 place-items-center bg-brand text-white">
          <Icon name="cross" className="h-11 w-11" strokeWidth={2} />
        </span>

        <p className="mt-8 font-heading text-[64px] font-bold leading-none text-brand sm:text-[84px]">
          404
        </p>
        <h1 className="mt-4 font-heading text-[27px] font-bold text-ink sm:text-[34px]">
          We Could Not Find That Page
        </h1>
        <p className="mx-auto mt-4 max-w-md text-[16px] leading-[1.8] text-muted">
          The page you are looking for may have been moved or no longer exists. Let us help
          you find your way back.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link to="/" className="btn-primary">
            Return to Home
          </Link>
          <Link to="/contact" className="btn-ghost">
            Contact the Church
          </Link>
        </div>
      </div>
    </section>
  )
}
