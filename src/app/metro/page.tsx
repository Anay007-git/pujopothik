"use client";

import React, { useState } from "react";
import MetroMapGuide from "@/components/metro/MetroMapGuide";
import PandalModal from "@/components/pandals/PandalModal";
import { Pandal } from "@/data/pandalsData";

export default function MetroPage() {
  const [modalPandal, setModalPandal] = useState<Pandal | null>(null);

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <MetroMapGuide onViewDetails={(p) => setModalPandal(p)} />
      <PandalModal
        pandal={modalPandal}
        onClose={() => setModalPandal(null)}
      />
    </div>
  );
}

