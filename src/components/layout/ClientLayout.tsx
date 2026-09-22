"use client";

import React, { useState } from "react";
import Navbar from "./Navbar";
import MobileBottomNav from "./MobileBottomNav";
import Footer from "./Footer";
import RouteDrawer from "@/components/route-builder/RouteDrawer";
import IntroScreen from "@/components/animations/IntroScreen";
import SearchModal from "./SearchModal";
import PandalModal from "@/components/pandals/PandalModal";
import PujoCompanionModal from "@/components/companion/PujoCompanionModal";
import PujoCompanionTrigger from "@/components/companion/PujoCompanionTrigger";
import { CompanionProvider } from "@/context/CompanionContext";
import { Pandal } from "@/data/pandalsData";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [modalPandal, setModalPandal] = useState<Pandal | null>(null);

  const handleSelectPandal = (pandal: Pandal) => {
    setModalPandal(pandal);
  };

  return (
    <CompanionProvider>
      {/* 2-Second Festive Intro Screen */}
      <IntroScreen />

      {/* Main Desktop & Mobile Header */}
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Main App Page Content */}
      <main className="flex-1 pb-16 md:pb-0">{children}</main>

      {/* Bengali Magazine Styled Footer */}
      <Footer />

      {/* Floating Pujo Companion Trigger (Budget, Steps & AI) */}
      <PujoCompanionTrigger />

      {/* Mobile Fixed Bottom Navigation */}
      <MobileBottomNav onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Slide-in Route Drawer */}
      <RouteDrawer />

      {/* Unified Pujo Companion Hub Modal (Budget, Steps, Diary & AI Mitra) */}
      <PujoCompanionModal />

      {/* Global Instant Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectPandal={handleSelectPandal}
      />

      {/* Global Pandal Details Modal */}
      <PandalModal
        pandal={modalPandal}
        onClose={() => setModalPandal(null)}
      />
    </CompanionProvider>
  );
}
