"use client";

import { CSSProperties } from "react";

export type AppVariant =
  | "dashboard"
  | "profile"
  | "chat"
  | "onboarding"
  | "settings"
  | "chart";

type Props = { variant: AppVariant };

export default function AppScreen({ variant }: Props) {
  if (variant === "dashboard") return <DashboardApp />;
  if (variant === "profile") return <ProfileApp />;
  if (variant === "chat") return <ChatApp />;
  if (variant === "onboarding") return <OnboardingApp />;
  if (variant === "settings") return <SettingsApp />;
  return <ChartApp />;
}

function DashboardApp() {
  return (
    <div className="app">
      <div className="app-header">
        <div className="app-greet">Hi, Shamil</div>
        <div className="app-avatar" />
      </div>
      <div className="app-card hero-card">
        <div className="label">Today</div>
        <div className="value">$ 24,182</div>
        <div className="delta">▲ 12.4% vs last week</div>
        <div className="app-spark">
          <svg viewBox="0 0 100 50" preserveAspectRatio="none">
            <defs>
              <linearGradient id="sparkGrad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#c8ff00" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#c8ff00" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              className="area"
              d="M0,40 L8,32 L18,35 L28,22 L38,28 L48,15 L58,20 L68,10 L78,18 L88,8 L100,14 L100,50 L0,50 Z"
            />
            <path
              className="line"
              d="M0,40 L8,32 L18,35 L28,22 L38,28 L48,15 L58,20 L68,10 L78,18 L88,8 L100,14"
            />
          </svg>
        </div>
      </div>
      <div className="app-row">
        <div className="app-card app-stat">
          <div className="label">Tasks</div>
          <div className="value">14</div>
          <div className="meta">3 due today</div>
        </div>
        <div className="app-card app-stat">
          <div className="label">Streak</div>
          <div className="value">28</div>
          <div className="meta">days · pb</div>
        </div>
      </div>
      <div className="app-card">
        <div className="label">Focus</div>
        <div className="app-bar">
          {[0.4, 0.7, 0.55, 0.85, 0.6, 0.95, 0.75].map((h, i) => (
            <i key={i} className={i % 2 ? "alt" : ""} style={{ height: `${h * 100}%` } as CSSProperties} />
          ))}
        </div>
      </div>
      <div className="app-tab">
        <i className="on" />
        <i />
        <i />
        <i />
      </div>
    </div>
  );
}

function ProfileApp() {
  return (
    <div className="app app-profile">
      <div className="pa" />
      <div className="pn">Shamil</div>
      <div className="pt">creative · developer</div>
      <div className="pstats">
        <div>
          <div className="v">128</div>
          <div className="l">shipped</div>
        </div>
        <div>
          <div className="v">42</div>
          <div className="l">clients</div>
        </div>
        <div>
          <div className="v">7y</div>
          <div className="l">crafting</div>
        </div>
      </div>
      <div style={{ width: "100%", padding: "0 18px", marginTop: 22 }}>
        <div className="app-card">
          <div className="label" style={{ fontSize: 7, opacity: 0.5, letterSpacing: "0.18em", textTransform: "uppercase" }}>About</div>
          <div style={{ marginTop: 6, fontSize: 9, lineHeight: 1.5, color: "rgba(255,255,255,0.7)" }}>
            I build mobile apps that feel inevitable. Pixels, code, and a little obsession.
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatApp() {
  return (
    <div className="app app-chat">
      <div className="app-header">
        <div className="app-greet">Messages</div>
        <div className="app-avatar" />
      </div>
      <div style={{ display: "flex", flexDirection: "column", marginTop: 8 }}>
        <div className="msg in">when can we ship the new build?</div>
        <div className="msg out">tonight. polishing the easing curve now</div>
        <div className="msg in">it&apos;s already smooth though</div>
        <div className="msg out">there is no &quot;already smooth&quot;</div>
        <div className="msg in">ok mr. perfectionist 😅</div>
      </div>
      <div className="app-tab">
        <i />
        <i className="on" />
        <i />
        <i />
      </div>
    </div>
  );
}

function OnboardingApp() {
  return (
    <div className="app app-onboarding">
      <div className="ob-mark">S</div>
      <div className="ob-h">Built for the way you think.</div>
      <div className="ob-p">Designed in motion. Composed in light. Engineered down to the last frame.</div>
      <div className="ob-btn">Begin</div>
    </div>
  );
}

function SettingsApp() {
  return (
    <div className="app app-settings">
      <div className="app-header">
        <div className="app-greet">Settings</div>
        <div className="app-avatar" />
      </div>
      <div style={{ marginTop: 4 }}>
        <div className="item">
          <span>Smooth scroll</span>
          <span className="toggle on" />
        </div>
        <div className="item">
          <span>Haptics</span>
          <span className="toggle on" />
        </div>
        <div className="item">
          <span>Dark mode</span>
          <span className="toggle on" />
        </div>
        <div className="item">
          <span>Reduced motion</span>
          <span className="toggle" />
        </div>
        <div className="item">
          <span>Sync to cloud</span>
          <span className="toggle on" />
        </div>
        <div className="item">
          <span>Beta features</span>
          <span className="toggle" />
        </div>
      </div>
      <div className="app-tab">
        <i />
        <i />
        <i />
        <i className="on" />
      </div>
    </div>
  );
}

function ChartApp() {
  return (
    <div className="app">
      <div className="app-header">
        <div className="app-greet">Analytics</div>
        <div className="app-avatar" />
      </div>
      <div className="app-card hero-card">
        <div className="label">Active users</div>
        <div className="value">8,241</div>
        <div className="delta">▲ 23% this month</div>
      </div>
      <div className="app-card" style={{ marginTop: 4 }}>
        <div className="label" style={{ fontSize: 7, opacity: 0.5, letterSpacing: "0.18em", textTransform: "uppercase" }}>By region</div>
        <div className="app-list">
          <div className="item">
            <span className="name">United States</span>
            <span className="v">3,418</span>
          </div>
          <div className="item">
            <span className="name">India</span>
            <span className="v">2,140</span>
          </div>
          <div className="item">
            <span className="name">Germany</span>
            <span className="v">982</span>
          </div>
          <div className="item">
            <span className="name">Japan</span>
            <span className="v">740</span>
          </div>
          <div className="item">
            <span className="name">Brazil</span>
            <span className="v">514</span>
          </div>
        </div>
      </div>
      <div className="app-tab">
        <i />
        <i />
        <i className="on" />
        <i />
      </div>
    </div>
  );
}
