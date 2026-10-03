'use client';

// ============================================================================
// 4D WEATHER & AGRONOMIC INTELLIGENCE ECOSYSTEM
// Dataset Upload & Automated Scientific Profiler Modal
// Supports NetCDF, GRIB, CSV, GeoJSON, Parquet, Zarr
// ============================================================================

import React, { useState } from 'react';
import {
  X,
  UploadCloud,
  FileCode,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useShellStore } from '@/services/useShellStore';

export default function DatasetUploadModal() {
  const { datasetModalOpen, setDatasetModalOpen, setAttachedDataset } = useShellStore();
  const [isProfiling, setIsProfiling] = useState(false);
  const [profiledDataset, setProfiledDataset] = useState<{
    fileName: string;
    variablesCount: number;
    timeSteps: number;
    levels: number;
    gridResolution: string;
    ensembleMembers: number;
    regionCoverage: string;
    missingValuesPct: number;
    status: string;
  } | null>(null);

  if (!datasetModalOpen) return null;

  const handleSimulateUpload = () => {
    setIsProfiling(true);
    setTimeout(() => {
      setProfiledDataset({
        fileName: 'ECMWF_NEPS_KHARIF_2026_T120.nc',
        variablesCount: 14,
        timeSteps: 120,
        levels: 5,
        gridResolution: '0.25° (Atmospheric Boundary)',
        ensembleMembers: 24,
        regionCoverage: 'Bay of Bengal & Eastern India [15°N–25°N, 80°E–92°E]',
        missingValuesPct: 0.8,
        status: 'READY FOR DOWNSCALING & ENSEMBLE CLUSTERING'
      });
      setIsProfiling(false);
      setAttachedDataset('ECMWF_NEPS_2026.nc (24 Ens)');
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 font-sans select-none animate-in fade-in duration-200">
      <div className="bg-[#0B1728] border border-[rgba(110,170,220,0.2)] rounded-2xl w-full max-w-2xl flex flex-col shadow-2xl overflow-hidden text-[#F4F8FC]">
        {/* Header */}
        <div className="p-5 border-b border-[rgba(110,170,220,0.14)] flex items-center justify-between bg-[#07111F]/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#18A9E8]/10 border border-[#18A9E8]/30 flex items-center justify-center text-[#36C5FF]">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-mono tracking-wide">
                CONNECT SCIENTIFIC DATASET // TENSOR INGESTION
              </h3>
              <p className="text-xs text-[#9BAFC3]">
                Drop NetCDF, GRIB, CSV or Zarr stores for automated tensor metadata profiling
              </p>
            </div>
          </div>

          <button
            onClick={() => setDatasetModalOpen(false)}
            className="p-2 rounded-full text-[#9BAFC3] hover:text-white hover:bg-[#13253B] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Upload Zone */}
        <div className="p-6 space-y-4">
          <div
            onClick={handleSimulateUpload}
            className="border-2 border-dashed border-[rgba(110,170,220,0.24)] hover:border-[#36C5FF] bg-[#07111F]/60 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all group"
          >
            <div className="w-14 h-14 rounded-full bg-[#18A9E8]/10 flex items-center justify-center text-[#36C5FF] group-hover:scale-110 transition-transform mb-3">
              <FileCode className="w-7 h-7" />
            </div>

            <div className="text-sm font-bold text-white">
              Click to browse or drop atmospheric tensor file here
            </div>
            <div className="text-xs text-[#9BAFC3] mt-1 max-w-sm">
              Supports <span className="text-[#36C5FF]">.nc</span>,{' '}
              <span className="text-[#36C5FF]">.grib2</span>,{' '}
              <span className="text-[#36C5FF]">.zarr</span>, and{' '}
              <span className="text-[#36C5FF]">.csv</span> tables
            </div>

            <div className="mt-4 px-3 py-1 rounded-full text-[10px] font-mono bg-[#13253B] text-[#9BAFC3] border border-[rgba(110,170,220,0.14)]">
              Demo: Click to simulate instant upload & profile
            </div>
          </div>

          {/* Profiler Output Box */}
          {isProfiling && (
            <div className="p-4 rounded-xl border border-[rgba(110,170,220,0.2)] bg-[#07111F] text-xs font-mono text-[#36C5FF] animate-pulse flex items-center justify-center gap-2">
              <Cpu className="w-4 h-4 animate-spin" />
              <span>Scanning dimension coordinates, levels, and missing values...</span>
            </div>
          )}

          {profiledDataset && (
            <div className="p-4 rounded-xl border border-[#10b981]/30 bg-[#07111F] space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-[#10b981] font-bold">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  DATASET PROFILED SUCCESSFULLY
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#10b981]/10 border border-[#10b981]/30">
                  {profiledDataset.status}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-[rgba(110,170,220,0.1)] text-[11px]">
                <div>
                  <span className="text-[#61768B]">Variables:</span> {profiledDataset.variablesCount} Fields
                </div>
                <div>
                  <span className="text-[#61768B]">Time:</span> {profiledDataset.timeSteps} Steps
                </div>
                <div>
                  <span className="text-[#61768B]">Levels:</span> {profiledDataset.levels} Isobaric
                </div>
                <div>
                  <span className="text-[#61768B]">Ensemble:</span> {profiledDataset.ensembleMembers} Members
                </div>
              </div>

              <div className="text-[11px] pt-1 text-[#9BAFC3]">
                <span className="text-[#61768B]">Spatial Coverage:</span> {profiledDataset.regionCoverage}
              </div>

              <div className="pt-3 border-t border-[rgba(110,170,220,0.1)] flex items-center justify-between">
                <span className="text-[10px] text-[#61768B]">
                  Missing: {profiledDataset.missingValuesPct}% | Resolution: {profiledDataset.gridResolution}
                </span>
                <button
                  onClick={() => setDatasetModalOpen(false)}
                  className="px-4 py-1.5 rounded-full bg-[#18A9E8] hover:bg-[#36C5FF] text-[#07111F] font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <span>Attach to Query</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
