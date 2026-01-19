import { FcGoogle } from "react-icons/fc";
import { registerAction } from '@/app/actions/auth';

export default function RegisterPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white selection:bg-black selection:text-white p-4 sm:p-8 relative overflow-hidden">
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      ></div>
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gray-100 rounded-full blur-[120px] z-0"></div>

      <div className="relative z-10 w-full max-w-5xl bg-white border-2 border-primary shadow-[12px_12px_0px_0px] shadow-primary flex flex-col lg:flex-row overflow-hidden">
        <div className="lg:w-5/12 bg-primary p-8 lg:p-12 flex flex-col justify-between text-white">
          <div>
            <h1 className="text-5xl lg:text-6xl font-black tracking-tighter leading-none mb-6">
              JOIN THE <br /> CLUB.
            </h1>
            <p className="text-secondary max-w-45 text-[11px] leading-none font-black uppercase tracking-tighter border-t-4 border-secondary pt-5">
              Curated Form. <br />
              <span className="inline-block my-1 text-secondary/60">
                Rigorous Detail.
              </span>{" "}
              <br />
              <span className="text-[10px] font-medium tracking-[0.4em] text-secondary/50 block mt-2">
                PRIVATE ACCESS ONLY
              </span>
            </p>
          </div>

          <div className="hidden lg:block">
            <p className="text-xs uppercase tracking-widest text-gray-500 font-bold">
              © 2026 Atelier Store
            </p>
          </div>
        </div>
        <div className="lg:w-7/12 p-8 lg:p-12">
          <div className="flex flex-col h-full justify-center">
            <div className="flex flex-col md:flex-row gap-10">
              <div className="flex-1">
                <h2 className="text-sm uppercase tracking-[0.2em] font-black mb-8 text-gray-400">
                  Welcome
                </h2>
                <form action={registerAction} className="space-y-4">
                  <div className="group border-b-2 border-gray-200 focus-within:border-black transition-colors duration-300">
                    <label className="text-[10px] uppercase font-bold text-gray-400 group-focus-within:text-black">
                      Full Name
                    </label>
                    <input
                      name="name"
                      type="text"
                      required
                      placeholder="John Doe"
                      className="w-full pb-3 pt-1 outline-none text-lg bg-transparent placeholder:text-gray-300"
                    />
                  </div>
                  <div className="group border-b-2 border-gray-200 focus-within:border-black transition-colors duration-300">
                    <label className="text-[10px] uppercase font-bold text-gray-400 group-focus-within:text-black">
                      Email
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="hello@example.com"
                      className="w-full pb-3 pt-1 outline-none text-lg bg-transparent placeholder:text-gray-300"
                    />
                  </div>
                  <div className="group border-b-2 border-gray-200 focus-within:border-black transition-colors duration-300">
                    <label className="text-[10px] uppercase font-bold text-gray-400 group-focus-within:text-black">
                      Password
                    </label>
                    <input
                      name="password"
                      type="password"
                      required
                      placeholder="••••••••"
                      className="w-full pb-3 pt-1 outline-none text-lg bg-transparent placeholder:text-gray-300"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-6 bg-primary text-white py-4 font-black uppercase tracking-widest hover:bg-gray-800 transform active:scale-[0.98] transition-all"
                  >
                    Create Account
                  </button>
                </form>
              </div>
              <div className="md:hidden flex items-center gap-4">
                <div className="h-px bg-gray-200 flex-1"></div>
                <span className="text-[10px] font-black text-gray-400 italic">
                  OR
                </span>
                <div className="h-px bg-gray-200 flex-1"></div>
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <h2 className="hidden md:block text-sm uppercase tracking-[0.2em] font-black mb-8 text-gray-400 text-center">
                  Quick Access
                </h2>
                <div className="space-y-4">
                  <button className="w-full flex items-center justify-center gap-3 px-6 py-4 border-2 border-black font-bold hover:bg-gray-50 transition-colors group">
                    <FcGoogle className="text-2xl group-hover:scale-110 transition-transform" />
                    <span className="text-sm">Sign Up with Google</span>
                  </button>
                </div>

                <p className="mt-8 text-[10px] text-gray-400 text-center leading-relaxed font-medium">
                  By signing up, you agree to our{" "}
                  <span className="text-black underline cursor-pointer">
                    Terms
                  </span>{" "}
                  and{" "}
                  <span className="text-black underline cursor-pointer">
                    Privacy Policy
                  </span>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}