import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, BookOpen, Users, Award } from 'lucide-react';
import { ClassDataMap } from '../types';

interface GradesViewProps {
  onBack: () => void;
}

export const GradesView: React.FC<GradesViewProps> = ({ onBack }) => {
  const [selectedSchool, setSelectedSchool] = useState<string | null>(null);
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);

  // In a real app, this data would be fetched from Firebase or constants.
  // For now, I'll use a mocked structure to show what it would look like
  // based on the constants.ts structure.
  
  const schools = ["EE Cordelia Paiva", "CIEP 198", "CIEP 369", "CIEP 320"];
  
  // This is a placeholder for the logic that would fetch real grades
  const renderGrades = () => {
    if (!selectedClassId) return null;
    
    // Mock data for the view
    const students = [
        { name: "Isabella Ribeiro Gomes", prova: 0, parte: 0, pres: 0, trab: 2.5, total: 2.5 },
        { name: "Isabella Vitoria Correa Pereira", prova: 0, parte: 0, pres: 0, trab: 3.0, total: 3.0 },
        { name: "Isabelly Lopes do Nascimento", prova: 0, parte: 0, pres: 0, trab: 3.0, total: 3.0 },
        { name: "Lara Maria de Sousa Soares", prova: 0, parte: 0, pres: 0, trab: 3.0, total: 3.0 },
        { name: "Lavinnya de Souza de Araújo", prova: 0, parte: 0, pres: 0, trab: 3.0, total: 3.0 },
        { name: "Leticia Costa Santos", prova: 0, parte: 0, pres: 0, trab: 3.0, total: 3.0 },
        { name: "Livia Duarte Soares de Lima", prova: 0, parte: 0, pres: 0, trab: 2.5, total: 2.5 },
        { name: "Manuela Figueiredo da Silva", prova: 0, parte: 0, pres: 0, trab: 2.2, total: 2.2 },
        { name: "Manuela Ribeiro dos Santos", prova: 0, parte: 0, pres: 0, trab: 2.5, total: 2.5 },
        { name: "Maria Rita de Jesus Sergio", prova: 0, parte: 0, pres: 0, trab: 2.2, total: 2.2 }
    ];

    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-xl font-bold mb-4">Notas - Turma {selectedClassId} (2º Trimestre)</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b border-slate-200">
              <th className="p-2">Aluno</th>
              <th className="p-2">Prova (5)</th>
              <th className="p-2">Part. (1)</th>
              <th className="p-2">Pres. (1)</th>
              <th className="p-2">Trab. (3)</th>
              <th className="p-2">Total (10)</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, i) => (
              <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="p-2">{s.name}</td>
                <td className="p-2">{s.prova}</td>
                <td className="p-2">{s.parte}</td>
                <td className="p-2">{s.pres}</td>
                <td className="p-2">{s.trab}</td>
                <td className="p-2 font-bold">{s.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="p-8 font-sans bg-slate-50 min-h-screen">
      <button onClick={onBack} className="mb-6 flex items-center gap-2 text-slate-600 hover:text-slate-900 font-bold bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200">
        <ChevronLeft size={20} /> Voltar
      </button>

      <h1 className="text-3xl font-black text-slate-900 mb-8 uppercase tracking-tighter">Central de Notas</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="font-bold mb-4 text-slate-700">Selecione uma Escola</h2>
            {schools.map(school => (
                <button
                 key={school}
                 onClick={() => setSelectedSchool(school)}
                 className={`w-full text-left p-4 rounded-xl mb-2 border ${selectedSchool === school ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 hover:border-slate-300'}`}
                >
                    {school}
                </button>
            ))}
        </div>
        
        {selectedSchool && (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h2 className="font-bold mb-4 text-slate-700">Selecione uma Turma</h2>
                {["801", "802", "803"].map(turma => (
                    <button
                        key={turma}
                        onClick={() => setSelectedClassId(turma)}
                        className={`w-full text-left p-4 rounded-xl mb-2 border ${selectedClassId === turma ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 hover:border-slate-300'}`}
                    >
                        Turma {turma}
                    </button>
                ))}
            </div>
        )}
      </div>

      <div className="mt-8">
        {renderGrades()}
      </div>
    </div>
  );
};
