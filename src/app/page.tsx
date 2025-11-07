import { isSignedIn } from '@/echo';
import { EchoAccount } from '@/components/echo-account-next';
import { CatForgeClient } from '@/components/catforge-client';
import Image from 'next/image';

export default async function Home() {
  const signedIn = await isSignedIn();

  return (
    <div className="relative min-h-screen overflow-hidden text-slate-100">
      <div className="pointer-events-none fixed inset-0">
        <Image
          src="/background.png"
          alt="CatForge cosmic background"
          fill
          priority
          sizes="100vw"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/60" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-4 py-10 lg:px-6">
        <header className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
          <Image
            src="/header.png"
            alt="Cosmic cats forging header"
            fill
            priority
            sizes="(min-width: 1280px) 1280px, 100vw"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-slate-950/60 to-slate-950/80 backdrop-blur-sm" />
          <div className="relative z-10 flex flex-col gap-8 p-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-4">
              <span className="inline-flex items-center rounded-full bg-indigo-600/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-100 shadow-sm">
                catforge
              </span>
              <h1 className="text-4xl font-black tracking-tight text-white drop-shadow-lg lg:text-5xl">
                Describe the claws and chaos! Cat Forge delivers the purrfection.
              </h1>
              <p className="text-lg text-indigo-100/90 drop-shadow">
                Pick a city, paint the fur, crank the vibe; Echo routes it into instant meme fuel.
              </p>
            </div>
            <div className="flex justify-end">
              <div className="rounded-2xl border border-white/15 bg-slate-950/70 p-4 shadow-lg backdrop-blur">
                <EchoAccount />
              </div>
            </div>
          </div>
        </header>

        <main className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl backdrop-blur lg:p-8">
          <CatForgeClient signedIn={signedIn} />
        </main>

        <footer className="pb-8 text-left text-xs text-slate-400">
          Powered by Echo agents and your chaotic imagination.
        </footer>
      </div>
    </div>
  );
}
