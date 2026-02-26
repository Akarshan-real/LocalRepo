import { Link } from 'react-router-dom';
import { Logo } from '../index';

const Footer = () => {
  return (
    <footer id='footer'>
      <section className="relative overflow-hidden py-10 bg-(--surface) border border-x-0 border-y-2 border-y-(--border)">
        <div className="relative z-10 mx-auto max-w-7xl px-4">
          <div className="-m-6 flex flex-wrap">
            <div className="w-full p-6 md:w-1/2 lg:w-5/12">
              <div className="flex h-full flex-col justify-between mid">
                <div className="mb-4 flex mid">
                  <Logo className="w-[40%]" />
                </div>
                <div>
                  <p className="text-sm text-(--text-muted)">
                    &copy; Copyright 2026. All Rights Reserved by ShinCodes.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full p-6 md:w-1/2 lg:w-2/12">
              <div className="h-full">
                <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-(--text-muted)">
                  Company
                </h3>
                <ul>
                  <li className="mb-4">
                    <Link
                      className="text-base font-medium text-(--text) hover:text-(--primary) transition"
                      to="/"
                    >
                      Features
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link
                      className=" text-base font-medium text-(--text) hover:text-(--primary) transition"
                      to="/"
                    >
                      Pricing
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link
                      className=" text-base font-medium text-(--text) hover:text-(--primary) transition"
                      to="/"
                    >
                      Affiliate Program
                    </Link>
                  </li>
                  <li>
                    <Link
                      className=" text-base font-medium text-(--text) hover:text-(--primary) transition"
                      to="/"
                    >
                      Press Kit
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full p-6 md:w-1/2 lg:w-2/12">
              <div className="h-full">
                <h3 className="tracking-px mb-9 text-xs font-semibold uppercase text-(--text-muted)">
                  Support
                </h3>
                <ul>
                  <li className="mb-4">
                    <Link
                      className=" text-base font-medium text-(--text) hover:text-(--primary) transition"
                      to="/"
                    >
                      Account
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link
                      className=" text-base font-medium text-(--text) hover:text-(--primary) transition"
                      to="/"
                    >
                      Help
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link
                      className=" text-base font-medium text-(--text) hover:text-(--primary) transition"
                      to="/"
                    >
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      className=" text-base font-medium text-(--text) hover:text-(--primary) transition"
                      to="/"
                    >
                      Customer Support
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full p-6 md:w-1/2 lg:w-3/12">
              <div className="h-full">
                <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-(--text-muted) hover:text-(--primary) transition">
                  Legals
                </h3>
                <ul>
                  <li className="mb-4">
                    <Link
                      className=" text-base font-medium text-(--text) hover:text-(--primary) transition"
                      to="/"
                    >
                      Terms &amp; Conditions
                    </Link>
                  </li>
                  <li className="mb-4">
                    <Link
                      className=" text-base font-medium text-(--text) hover:text-(--primary) transition"
                      to="/"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      className=" text-base font-medium text-(--text) hover:text-(--primary) transition"
                      to="/"
                    >
                      Licensing
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </footer>
  )
}

export default Footer
