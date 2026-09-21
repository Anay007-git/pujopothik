"use client";

import React, { useState } from "react";
import ThemeExplorer from "@/components/themes/ThemeExplorer";
import PandalModal from "@/components/pandals/PandalModal";
import { Pandal } from "@/data/pandalsData";

export default function ThemesPage() {
  const [modalPandal, setModalPandal] = useState<Pandal | null>(null);

  return (
    <div className="py-6">
      <ThemeExplorer onViewDetails={(p) => setModalPandal(p)} />
      <PandalModal
        pandal={modalPandal}
        onClose={() => setModalPandal(null)}
      />
    </div>
  );
}

