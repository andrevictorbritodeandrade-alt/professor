import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import { Profile } from './components/Profile';
import { BackgroundSlider } from './components/BackgroundSlider';
import { DashboardView } from './components/DashboardView';
import { StatisticsView } from './components/StatisticsView';
import { ClassesView } from './components/ClassesView';
import { EmentaView } from './components/EmentaView';
import { PlanoDeCursoView } from './components/PlanoDeCursoView';
import { ScheduleView } from './components/ScheduleView';
import { GalleryView } from './components/GalleryView';
import { DecolonialApp } from './components/DecolonialApp';
import { SlideViewer } from './components/SlideViewer';
import { CalendarView } from './components/CalendarView';
import { WeatherWidget } from './components/WeatherWidget';
import { BottomNav } from './components/BottomNav';
import { DailyActivityLogView } from './components/DailyActivityLogView';
import { PortalView } from './components/PortalView';
import { ProfessorLoginView } from './components/ProfessorLoginView';
import { AlunosView } from './components/AlunosView';
import { ViewState, ClassDataMap, ClassData, GalleryData } from './types';
import { mockUserProfile, initialClassData } from './constants';
import { initFirebase, subscribeToClasses, saveClassesToFirestore, subscribeToGallery, saveGalleryToFirestore } from './services/firebaseService';
import { AiAssistant } from './components/AiAssistant';

// --- Global Footer Component ---
const GlobalFooter = () => (
  <footer className="w-full py-6 text-center relative z-50 shrink-0 mt-auto bg-[#fdfaf6]/80 backdrop-blur-md border-t border-slate-300">
    <div className="container mx-auto px-4 flex flex-col items-center gap-1">
        <p className="text-[10px] md:text-xs font-bold text-slate-800">
          Desenvolvido por: André Victor Brito de Andrade • CREF 039443 G/RJ
        </p>
      <p className="text-[10px] md:text-xs font-medium text-slate-600">
        Contato: andrevictorbritodeandrade@gmail.com
      </p>
      <p className="text-[10px] md:text-xs font-medium text-slate-500">
        versão: 1.1
      </p>
    </div>
  </footer>
);

// --- Sync Status Indicator ---
const SyncStatusIndicator = ({ status }: { status: 'synced' | 'saving' | 'error' }) => {
  return null;
};

// Helper to deduplicate student arrays by name (case-insensitive) and by ID, while merging attendance
const deduplicateStudentsByNameAndId = (students: any[]): { deduplicated: any[], wasChanged: boolean } => {
  if (!students || !Array.isArray(students)) return { deduplicated: students, wasChanged: false };
  const seenNames = new Map<string, any>();
  const seenIds = new Map<string, any>();
  const deduplicated: any[] = [];
  let wasChanged = false;

  students.forEach((s: any) => {
    if (!s || !s.name) return;
    const cleanName = s.name.trim().toLowerCase();
    const cleanId = String(s.id);

    const matchByName = seenNames.get(cleanName);
    const matchById = seenIds.get(cleanId);
    const existing = matchByName || matchById;

    if (existing) {
      wasChanged = true;
      // Merge attendance to the existing student
      existing.attendance = {
        ...(existing.attendance || {}),
        ...(s.attendance || {})
      };
    } else {
      const copy = { ...s, attendance: { ...(s.attendance || {}) } };
      deduplicated.push(copy);
      seenNames.set(cleanName, copy);
      seenIds.set(cleanId, copy);
    }
  });

  if (deduplicated.length !== students.length) {
    wasChanged = true;
  }
  return { deduplicated, wasChanged };
};

// --- Main App Component ---

const App: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [accessLevel, setAccessLevel] = useState<'portal' | 'alunos' | 'professor_login' | 'professor'>(() => {
    return (localStorage.getItem('app_accessLevel') as any) || 'portal';
  });
  const [currentView, setView] = useState<ViewState>(() => {

    const hash = window.location.hash.replace('#', '');
    if (hash && ['home', 'statistics', 'classes', 'ementa', 'plano', 'profile', 'decolonial'].includes(hash)) {
      return hash as ViewState;
    }
    return (localStorage.getItem('app_currentView') as ViewState) || 'home';
  });
  
  useEffect(() => {
    localStorage.setItem('app_accessLevel', accessLevel);
  }, [accessLevel]);

  // Shared State
  const [classData, setClassData] = useState<ClassDataMap>(() => {
    const stored = localStorage.getItem('app_classData');
    const base = stored ? JSON.parse(stored) : { ...initialClassData };

    // Migration for CIEP320_AP101: ensure the 19 correct students remain and any other ones (like the previous 7) are removed
    if (base["CIEP320_AP101"]) {
      const correctStudents: any[] = [
        { id: 10107, name: "Danyelle Thomaz Canêdo", attendance: { "15/05": "P", "08/05": "P" } },
        { id: 10106, name: "Diego Rafael da Silva Zan Pires", attendance: { "15/05": "P", "08/05": "P" } },
        { id: 10120, name: "Emylly Vitória Nascimento dos Santos", attendance: { "15/05": "P", "08/05": "P" } },
        { id: 10116, name: "Enzo de Jesus Rodrigues", attendance: { "15/05": "P", "08/05": "P" } },
        { id: 10113, name: "Ester Senes Magela", attendance: { "15/05": "P", "08/05": "P" } },
        { id: 10109, name: "Heverton Lima Xavier", attendance: { "15/05": "P", "08/05": "P" } },
        { id: 10108, name: "Ícaro Martins França", attendance: { "15/05": "P", "08/05": "P" } },
        { id: 10115, name: "Kevin Lucas Oliveira dos Santos", attendance: { "15/05": "P", "08/05": "P" } },
        { id: 10104, name: "Lucas Gabryel da Silva Nascimento", attendance: { "15/05": "P", "08/05": "P" } },
        { id: 10105, name: "Lucas Rodrigues da Silva Lima", attendance: { "15/05": "P", "08/05": "P" } },
        { id: 10123, name: "Maria Tayryne de Souza de Lima", attendance: { "15/05": "P", "08/05": "P" } },
        { id: 10103, name: "Micaelly Avolio Falsetta", attendance: { "15/05": "P", "08/05": "P" } },
        { id: 10102, name: "Millena Vitoria da Silva Jesus", attendance: { "15/05": "P", "08/05": "P" } },
        { id: 10110, name: "Nathan Galvão Bastos", attendance: { "15/05": "P", "08/05": "P" } },
        { id: 10119, name: "Nayara Vytorya dos Santos", attendance: { "15/05": "P", "08/05": "P" } },
        { id: 10101, name: "Sophia Lourenço da Silva", attendance: { "15/05": "P", "08/05": "P" } },
        { id: 10111, name: "Walbert Leonardo Lima Novaes", attendance: { "15/05": "P", "08/05": "P" } },
        { id: 10118, name: "Yuri da Silva Ribeiro", attendance: { "15/05": "P", "08/05": "P" } },
        { id: 10112, name: "Yuri Ryan Jesus Nascimento", attendance: { "15/05": "P", "08/05": "P" } }
      ];

      const studs = base["CIEP320_AP101"].students || [];
      const hasEduardo = studs.some((s: any) => s.id === 10124 || s.name.includes("Eduardo"));
      if (hasEduardo || studs.length !== 19) {
        base["CIEP320_AP101"].students = correctStudents;
      }
    }

    // Migration for CIEP476_1007: ensure the 11 correct students with positive attendance for 29/05 remain
    if (base["CIEP476_1007"]) {
      const correctStudents1007: any[] = [
        { id: 100701, name: "Ana Beatriz Ferreira Santos", attendance: { "29/05": "P" } },
        { id: 100702, name: "Ana Clara Mendonça Guimarães", attendance: { "29/05": "P" } },
        { id: 100703, name: "Anna Giulia de Félix", attendance: { "29/05": "P" } },
        { id: 100704, name: "Anny Camilly Gomes da Silva", attendance: { "29/05": "P" } },
        { id: 100705, name: "João Pedro Samara Soares", attendance: { "29/05": "P" } },
        { id: 100706, name: "Júlio César", attendance: { "29/05": "P" } },
        { id: 100707, name: "Ketelyn Vitória Fernandes Nascimento", attendance: { "29/05": "P" } },
        { id: 100708, name: "Maria Eduarda da Silva Gonçalves", attendance: { "29/05": "P" } },
        { id: 100709, name: "Maria Vitória Fonseca", attendance: { "29/05": "P" } },
        { id: 100710, name: "Rhyan Pereira", attendance: { "29/05": "P" } },
        { id: 100711, name: "Yuri Yohan Ferreira Rodrigues", attendance: { "29/05": "P" } }
      ];

      const studs = base["CIEP476_1007"].students || [];
      const hasPresence29 = studs.some((s: any) => s.attendance && s.attendance["29/05"] === "P");
      if (!hasPresence29 || studs.length !== 11) {
        base["CIEP476_1007"].students = correctStudents1007;
      }
    }
    
    // Ensure all initial daily activities and students are merged
    Object.keys(initialClassData).forEach(id => {
      if (!base[id]) {
        base[id] = { ...initialClassData[id] };
      } else {
        // Merge missing students or update if empty
        if (initialClassData[id].students && initialClassData[id].students.length > 0) {
          if (!base[id].students || base[id].students.length === 0) {
            base[id].students = [...initialClassData[id].students];
          } else {
            const existingStudentIds = new Set(base[id].students.map((s: any) => String(s.id)));
            initialClassData[id].students.forEach((stud: any) => {
              if (!existingStudentIds.has(String(stud.id))) {
                base[id].students.push(stud);
              }
            });

            // Merge attendance records from initialClassData to base students
            base[id].students.forEach((baseStud: any) => {
              const initStud = initialClassData[id].students.find((s: any) => String(s.id) === String(baseStud.id));
              if (initStud && initStud.attendance) {
                baseStud.attendance = {
                  ...baseStud.attendance,
                  ...initStud.attendance
                };
              }
            });
          }
        }

        // Deduplicate base[id].students just in case duplicates already exist
        if (base[id].students && base[id].students.length > 0) {
          const { deduplicated } = deduplicateStudentsByNameAndId(base[id].students);
          base[id].students = deduplicated;
        }

        if (initialClassData[id].dailyActivities && initialClassData[id].dailyActivities!.length > 0) {
          if (!base[id].dailyActivities) {
            base[id].dailyActivities = [];
          }
          const existingIds = new Set(base[id].dailyActivities!.map((a: any) => a.id));
          initialClassData[id].dailyActivities!.forEach((act: any) => {
            if (!existingIds.has(act.id)) {
              base[id].dailyActivities!.push(act);
            } else {
              const existingAct = base[id].dailyActivities!.find((a: any) => a.id === act.id);
              if (existingAct && existingAct.actualActivity !== act.actualActivity && act.actualActivity.includes("Trabalho do 2º Trimestre")) {
                existingAct.actualActivity = act.actualActivity;
              }
            }
          });
        }

        if (initialClassData[id].assignments && initialClassData[id].assignments!.length > 0) {
          if (!base[id].assignments) {
            base[id].assignments = [];
          }
          const existingAssignIds = new Set(base[id].assignments!.map((a: any) => a.id));
          initialClassData[id].assignments!.forEach((assign: any) => {
            if (!existingAssignIds.has(assign.id)) {
              base[id].assignments!.push(assign);
            }
          });
        }
      }
    });
    return base;
  });
  const [galleryData, setGalleryData] = useState<GalleryData>(() => {
    const stored = localStorage.getItem('app_galleryData');
    return stored ? JSON.parse(stored) : { images: [] };
  });

  // Persistence Refs
  const isRemoteClassUpdate = useRef(false);
  const hasLoadedClasses = useRef(false);
  const isRemoteGalleryUpdate = useRef(false);
  const hasLoadedGallery = useRef(false);

  // Sync Status State
  const [syncStatus, setSyncStatus] = useState<'synced' | 'saving' | 'error'>('synced');
  const [isInitializing, setIsInitializing] = useState(true);

  // Helper to save classes explicitly with debounce-like behavior for rapid updates
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const handleSaveClasses = async (newData: ClassDataMap) => {
    setSyncStatus('saving');
    
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    
    saveTimeoutRef.current = setTimeout(async () => {
      try {
        await saveClassesToFirestore(newData);
        setSyncStatus('synced');
      } catch (error) {
        console.error("Erro ao salvar:", error);
        setSyncStatus('error');
      }
    }, 1500); // 1.5s delay to batch rapid attendance marking
  };

  // Helper to save gallery explicitly
  const handleSaveGallery = async (newData: GalleryData) => {
    setSyncStatus('saving');
    try {
      await saveGalleryToFirestore(newData);
      setSyncStatus('synced');
    } catch (error) {
      console.error("Erro ao salvar galeria:", error);
      setSyncStatus('error');
    }
  };

  useEffect(() => {
    localStorage.setItem('app_classData', JSON.stringify(classData));
    if (hasLoadedClasses.current) {
      if (isRemoteClassUpdate.current) {
        isRemoteClassUpdate.current = false;
      } else {
        handleSaveClasses(classData);
      }
    }
  }, [classData]);

  useEffect(() => {
    localStorage.setItem('app_galleryData', JSON.stringify(galleryData));
    if (hasLoadedGallery.current) {
      if (isRemoteGalleryUpdate.current) {
        isRemoteGalleryUpdate.current = false;
      } else {
        handleSaveGallery(galleryData);
      }
    }
  }, [galleryData]);

  // State for Navigation within Classes
  const [selectedGrade, setSelectedGrade] = useState<string | null>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('grade') || localStorage.getItem('app_selectedGrade');
  });
  const [selectedClassId, setSelectedClassId] = useState<string | null>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('classId') || localStorage.getItem('app_selectedClassId');
  });

  useEffect(() => {
    localStorage.setItem('app_currentView', currentView);
    window.location.hash = currentView;
    // Expose setView to window for external access (like from ClassesView)
    (window as any).setView = setView;
  }, [currentView]);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (selectedGrade) {
      localStorage.setItem('app_selectedGrade', selectedGrade);
      url.searchParams.set('grade', selectedGrade);
    } else {
      localStorage.removeItem('app_selectedGrade');
      url.searchParams.delete('grade');
    }
    window.history.replaceState({}, '', url.toString());
  }, [selectedGrade]);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (selectedClassId) {
      localStorage.setItem('app_selectedClassId', selectedClassId);
      url.searchParams.set('classId', selectedClassId);
    } else {
      localStorage.removeItem('app_selectedClassId');
      url.searchParams.delete('classId');
    }
    window.history.replaceState({}, '', url.toString());
  }, [selectedClassId]);

  useEffect(() => {
    // Safety timeout to ensure the app loads even if Firestore is slow or offline
    const safetyTimeout = setTimeout(() => {
      setIsInitializing(false);
      console.warn("Safety load triggered: Firestore sync taking longer than expected. Proceeding with cache / local fallback data.");
    }, 2000);

    // Inicializa Firebase ao carregar o app
    const success = initFirebase();
    if (success) {
      // Subscribe to classes
      const unsubClasses = subscribeToClasses((firebaseClasses) => {
        clearTimeout(safetyTimeout);
        setIsInitializing(false);
        if (Object.keys(firebaseClasses).length > 0) {
          isRemoteClassUpdate.current = true;
          
          let migratedClasses = { ...firebaseClasses };
          let needsUpdateRemote = false;

          // Merge local initial structure with remote data to ensure all classes exist
          Object.keys(initialClassData).forEach(id => {
            if (!migratedClasses[id]) {
              migratedClasses[id] = initialClassData[id];
              needsUpdateRemote = true;
            } else {
              // Ensure critical fields (days, schedule) are up to date if missing
              if (!migratedClasses[id].days || migratedClasses[id].days.length === 0) {
                 migratedClasses[id].days = initialClassData[id].days;
                 needsUpdateRemote = true;
              }
              if (!migratedClasses[id].schedule) {
                 migratedClasses[id].schedule = initialClassData[id].schedule;
                 needsUpdateRemote = true;
              }
              if (!migratedClasses[id].school) {
                 migratedClasses[id].school = initialClassData[id].school;
                 needsUpdateRemote = true;
              }
              // Merge missing students and merge attendance from initialClassData students to base
              if (initialClassData[id].students && initialClassData[id].students.length > 0) {
                if (!migratedClasses[id].students || migratedClasses[id].students.length === 0) {
                  migratedClasses[id].students = [...initialClassData[id].students];
                  needsUpdateRemote = true;
                } else {
                  const existingStudentIds = new Set(migratedClasses[id].students.map((s: any) => String(s.id)));
                  initialClassData[id].students.forEach((stud: any) => {
                    if (!existingStudentIds.has(String(stud.id))) {
                      migratedClasses[id].students.push(stud);
                      needsUpdateRemote = true;
                    }
                  });

                  migratedClasses[id].students.forEach((baseStud: any) => {
                    const initStud = initialClassData[id].students.find((s: any) => String(s.id) === String(baseStud.id));
                    if (initStud && initStud.attendance) {
                      let changed = false;
                      if (!baseStud.attendance) {
                        baseStud.attendance = {};
                        changed = true;
                      }
                      Object.keys(initStud.attendance).forEach(date => {
                        if (baseStud.attendance[date] !== initStud.attendance[date]) {
                          baseStud.attendance[date] = initStud.attendance[date];
                          changed = true;
                        }
                      });
                      if (changed) {
                        needsUpdateRemote = true;
                      }
                    }
                  });
                }
              }
              // Ensure default daily activities (like for Cordelia Paiva classes) are merged in
              if (initialClassData[id].dailyActivities && initialClassData[id].dailyActivities!.length > 0) {
                if (!migratedClasses[id].dailyActivities) {
                  migratedClasses[id].dailyActivities = [];
                }
                const existingIds = new Set(migratedClasses[id].dailyActivities!.map(a => a.id));
                initialClassData[id].dailyActivities!.forEach(act => {
                  if (!existingIds.has(act.id)) {
                    migratedClasses[id].dailyActivities!.push(act);
                    needsUpdateRemote = true;
                  } else {
                    const existingAct = migratedClasses[id].dailyActivities!.find(a => a.id === act.id);
                    if (existingAct && existingAct.actualActivity !== act.actualActivity && act.actualActivity.includes("Trabalho do 2º Trimestre")) {
                      existingAct.actualActivity = act.actualActivity;
                      needsUpdateRemote = true;
                    }
                  }
                });
              }

              // Ensure default assignments are merged in
              if (initialClassData[id].assignments && initialClassData[id].assignments!.length > 0) {
                if (!migratedClasses[id].assignments) {
                  migratedClasses[id].assignments = [];
                }
                const existingAssignIds = new Set(migratedClasses[id].assignments!.map(a => a.id));
                initialClassData[id].assignments!.forEach(assign => {
                  if (!existingAssignIds.has(assign.id)) {
                    migratedClasses[id].assignments!.push(assign);
                    needsUpdateRemote = true;
                  }
                });
              }
            }
          });

          // Deduplicate students for all loaded classes to resolve any duplicates (by ID or Name)
          Object.keys(migratedClasses).forEach(id => {
            if (migratedClasses[id] && migratedClasses[id].students) {
              const { deduplicated, wasChanged } = deduplicateStudentsByNameAndId(migratedClasses[id].students);
              if (wasChanged) {
                migratedClasses[id].students = deduplicated;
                needsUpdateRemote = true;
              }
            }
          });

            // Explicit cleanup for CIEP198_AP101 requested by user (removing mock names)
            if (migratedClasses["CIEP198_AP101"] && migratedClasses["CIEP198_AP101"].students) {
              const mockNamesList = ["Ana Silva", "Beatriz Costa", "Carlos Oliveira", "Davi Souza", "Eduardo Lima", "Fernanda Rocha", "Gabriel Alves", "Helena Dias", "Igor Martins", "Julia Pereira", "Kaique Santos", "Larissa Gomes", "Miguel Ferreira", "Nicole Ribeiro", "Otávio Castro"];
              const mockNamesSet = new Set(mockNamesList);
              const initialCount = migratedClasses["CIEP198_AP101"].students.length;

              migratedClasses["CIEP198_AP101"].students = migratedClasses["CIEP198_AP101"].students.filter(s => {
                const isMock = mockNamesSet.has(s.name) || /\s\d+$/.test(s.name);
                return !isMock;
              });

              if (migratedClasses["CIEP198_AP101"].students.length !== initialCount) {
                needsUpdateRemote = true;
              }
            }

            // Clean up CIEP320_AP101 to contain ONLY the correct 19 students in Firestore
            if (migratedClasses["CIEP320_AP101"]) {
              const correctStudents: any[] = [
                { id: 10107, name: "Danyelle Thomaz Canêdo", attendance: { "15/05": "P", "08/05": "P" } },
                { id: 10106, name: "Diego Rafael da Silva Zan Pires", attendance: { "15/05": "P", "08/05": "P" } },
                { id: 10120, name: "Emylly Vitória Nascimento dos Santos", attendance: { "15/05": "P", "08/05": "P" } },
                { id: 10116, name: "Enzo de Jesus Rodrigues", attendance: { "15/05": "P", "08/05": "P" } },
                { id: 10113, name: "Ester Senes Magela", attendance: { "15/05": "P", "08/05": "P" } },
                { id: 10109, name: "Heverton Lima Xavier", attendance: { "15/05": "P", "08/05": "P" } },
                { id: 10108, name: "Ícaro Martins França", attendance: { "15/05": "P", "08/05": "P" } },
                { id: 10115, name: "Kevin Lucas Oliveira dos Santos", attendance: { "15/05": "P", "08/05": "P" } },
                { id: 10104, name: "Lucas Gabryel da Silva Nascimento", attendance: { "15/05": "P", "08/05": "P" } },
                { id: 10105, name: "Lucas Rodrigues da Silva Lima", attendance: { "15/05": "P", "08/05": "P" } },
                { id: 10123, name: "Maria Tayryne de Souza de Lima", attendance: { "15/05": "P", "08/05": "P" } },
                { id: 10103, name: "Micaelly Avolio Falsetta", attendance: { "15/05": "P", "08/05": "P" } },
                { id: 10102, name: "Millena Vitoria da Silva Jesus", attendance: { "15/05": "P", "08/05": "P" } },
                { id: 10110, name: "Nathan Galvão Bastos", attendance: { "15/05": "P", "08/05": "P" } },
                { id: 10119, name: "Nayara Vytorya dos Santos", attendance: { "15/05": "P", "08/05": "P" } },
                { id: 10101, name: "Sophia Lourenço da Silva", attendance: { "15/05": "P", "08/05": "P" } },
                { id: 10111, name: "Walbert Leonardo Lima Novaes", attendance: { "15/05": "P", "08/05": "P" } },
                { id: 10118, name: "Yuri da Silva Ribeiro", attendance: { "15/05": "P", "08/05": "P" } },
                { id: 10112, name: "Yuri Ryan Jesus Nascimento", attendance: { "15/05": "P", "08/05": "P" } }
              ];

              const studs = migratedClasses["CIEP320_AP101"].students || [];
              const hasEduardo = studs.some((s: any) => s.id === 10124 || s.name.includes("Eduardo"));
              if (hasEduardo || studs.length !== 19) {
                migratedClasses["CIEP320_AP101"].students = correctStudents;
                needsUpdateRemote = true;
              }
            }

            // Clean up CIEP476_1007 to contain ONLY the correct 11 students with positive attendance in Firestore
            if (migratedClasses["CIEP476_1007"]) {
              const correctStudents1007: any[] = [
                { id: 100701, name: "Ana Beatriz Ferreira Santos", attendance: { "29/05": "P" } },
                { id: 100702, name: "Ana Clara Mendonça Guimarães", attendance: { "29/05": "P" } },
                { id: 100703, name: "Anna Giulia de Félix", attendance: { "29/05": "P" } },
                { id: 100704, name: "Anny Camilly Gomes da Silva", attendance: { "29/05": "P" } },
                { id: 100705, name: "João Pedro Samara Soares", attendance: { "29/05": "P" } },
                { id: 100706, name: "Júlio César", attendance: { "29/05": "P" } },
                { id: 100707, name: "Ketelyn Vitória Fernandes Nascimento", attendance: { "29/05": "P" } },
                { id: 100708, name: "Maria Eduarda da Silva Gonçalves", attendance: { "29/05": "P" } },
                { id: 100709, name: "Maria Vitória Fonseca", attendance: { "29/05": "P" } },
                { id: 100710, name: "Rhyan Pereira", attendance: { "29/05": "P" } },
                { id: 100711, name: "Yuri Yohan Ferreira Rodrigues", attendance: { "29/05": "P" } }
              ];

              const studs = migratedClasses["CIEP476_1007"].students || [];
              const hasPresence29 = studs.some((s: any) => s.attendance && s.attendance["29/05"] === "P");
              if (!hasPresence29 || studs.length !== 11) {
                migratedClasses["CIEP476_1007"].students = correctStudents1007;
                needsUpdateRemote = true;
              }
            }

             // Clean up Turma 803 to contain the correct 27 students with their presence/absence records (18/05, 25/05, and 01/06 - double periods)
             if (migratedClasses["803"]) {
               const correctStudents803: any[] = [
                 { id: 80301, name: "Adrieli Vitória dos Santos da Silva", attendance: { "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P" } },
                 { id: 80302, name: "Ana Clara de Jesus Pereira", attendance: { "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P" } },
                 { id: 80303, name: "Danilo Ribeiro Feliciano", attendance: { "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P" } },
                 { id: 80304, name: "Esther Nunes da Costa", attendance: { "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P" } },
                 { id: 80305, name: "Felipe Santos Vital Guimarães", attendance: { "18/05 - 1º T": "F", "18/05 - 2º T": "F", "25/05 - 1º T": "F", "25/05 - 2º T": "F", "01/06 - 1º T": "F", "01/06 - 2º T": "F" } },
                 { id: 80306, name: "Ítalo Silva de Almeida", attendance: { "18/05 - 1º T": "F", "18/05 - 2º T": "F", "25/05 - 1º T": "F", "25/05 - 2º T": "F", "01/06 - 1º T": "F", "01/06 - 2º T": "F" } },
                 { id: 80307, name: "João Paulo Lima da Silva", attendance: { "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P" } },
                 { id: 80308, name: "Matheus Araujo da Silva", attendance: { "18/05 - 1º T": "F", "18/05 - 2º T": "F", "25/05 - 1º T": "F", "25/05 - 2º T": "F", "01/06 - 1º T": "F", "01/06 - 2º T": "F" } },
                 { id: 80309, name: "Matheus Severiano Galdino da Silva", attendance: { "18/05 - 1º T": "F", "18/05 - 2º T": "F", "25/05 - 1º T": "F", "25/05 - 2º T": "F", "01/06 - 1º T": "F", "01/06 - 2º T": "F" } },
                 { id: 80310, name: "Micaella Moraes Lourenço da Silva", attendance: { "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P" } },
                 { id: 80311, name: "Micaelly Vitória Alves de França", attendance: { "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P" } },
                 { id: 80312, name: "Miguel Lucas Vicente Gomes", attendance: { "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P" } },
                 { id: 80313, name: "Milena Vitória Tavares de Jesus", attendance: { "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P" } },
                 { id: 80314, name: "Nicole Archanjo Santos", attendance: { "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P" } },
                 { id: 80315, name: "Pedro Henryk dos Santos Coelho", attendance: { "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P" } },
                 { id: 80316, name: "Pietro Vitor Santos Braga", attendance: { "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P" } },
                 { id: 80317, name: "Rafaela Lourenço da Silva Camilo", attendance: { "18/05 - 1º T": "F", "18/05 - 2º T": "F", "25/05 - 1º T": "F", "25/05 - 2º T": "F", "01/06 - 1º T": "F", "01/06 - 2º T": "F" } },
                 { id: 80318, name: "Rafaelle dos Santos Almeida", attendance: { "18/05 - 1º T": "F", "18/05 - 2º T": "F", "25/05 - 1º T": "F", "25/05 - 2º T": "F", "01/06 - 1º T": "F", "01/06 - 2º T": "F" } },
                 { id: 80319, name: "Ray Bomfim Pereira", attendance: { "18/05 - 1º T": "F", "18/05 - 2º T": "F", "25/05 - 1º T": "F", "25/05 - 2º T": "F", "01/06 - 1º T": "F", "01/06 - 2º T": "F" } },
                 { id: 80320, name: "Richard Reis Costa", attendance: { "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P" } },
                 { id: 80321, name: "Riquelme Oliveira Carlos", attendance: { "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P" } },
                 { id: 80322, name: "Roberta Flôr de Liz Araujo da Silva", attendance: { "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P" } },
                 { id: 80323, name: "Ryan Lucas Soares Velasco", attendance: { "18/05 - 1º T": "F", "18/05 - 2º T": "F", "25/05 - 1º T": "F", "25/05 - 2º T": "F", "01/06 - 1º T": "F", "01/06 - 2º T": "F" } },
                 { id: 80324, name: "Sarah Rafaela de Souza Ferreira", attendance: { "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P" } },
                 { id: 80325, name: "Sofia Nascimento de Araujo", attendance: { "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P" } },
                 { id: 80326, name: "Sophia Quaresma Jeronymo", attendance: { "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P" } },
                 { id: 80327, name: "Vitor Manoel Gomes da Silva", attendance: { "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P" } }
               ];

               const studs = migratedClasses["803"].students || [];
               const hasAttendanceMismatch = studs.length !== 27 || studs.some((s: any) => {
                 const corr = correctStudents803.find(c => c.id === s.id);
                 if (!corr) return true;
                 return !s.attendance || !s.attendance["18/05 - 1º T"] || !s.attendance["25/05 - 1º T"] || !s.attendance["01/06 - 1º T"];
               });

               if (hasAttendanceMismatch) {
                 migratedClasses["803"].students = correctStudents803;
                 needsUpdateRemote = true;
               }
             }

            // Clean up Turma 802 to contain the correct 28 students with their presence/absence records (18/05, 25/05, and 01/06 - double periods), ensuring no duplicates and added Kauã
            if (migratedClasses["802"]) {
              const correctStudents802: any[] = [
                { id: 802001, name: "Henzo Martins da Silva Evangelista", attendance: { "11/05": "P", "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "P", "08/06 - 2º T": "P" } },
                { id: 802002, name: "Isabella Ribeiro Gomes", attendance: { "11/05": "P", "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "F", "08/06 - 2º T": "F" } },
                { id: 802003, name: "Isabella Vitoria Correa Pereira", attendance: { "11/05": "P", "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "P", "08/06 - 2º T": "P" } },
                { id: 802004, name: "Isabelly Lopes do Nascimento", attendance: { "11/05": "P", "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "F", "25/05 - 2º T": "F", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "P", "08/06 - 2º T": "P" } },
                { id: 802005, name: "Jhully Victoria C. S. Oliveira", attendance: { "11/05": "F", "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "P", "08/06 - 2º T": "P" } },
                { id: 802006, name: "João Davi Gomes Pereira", attendance: { "11/05": "P", "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "P", "08/06 - 2º T": "P" } },
                { id: 802007, name: "João Gabriel Alves da Costa", attendance: { "11/05": "P", "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "P", "08/06 - 2º T": "P" } },
                { id: 802008, name: "João Marcos Oliveira Ribeiro", attendance: { "11/05": "P", "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "F", "25/05 - 2º T": "F", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "P", "08/06 - 2º T": "P" } },
                { id: 802009, name: "Julia Oliveira da Silva", attendance: { "11/05": "P", "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "P", "08/06 - 2º T": "P" } },
                { id: 802010, name: "Juliana Arueira Luparelli", attendance: { "11/05": "F", "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "F", "08/06 - 2º T": "F" } },
                { id: 802011, name: "Kaique Cruz Gonçalves Damião", attendance: { "11/05": "P", "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "P", "08/06 - 2º T": "P" } },
                { id: 802028, name: "Kauã Richard Ferreira da Silva", attendance: { "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "F", "08/06 - 2º T": "F" } },
                { id: 802012, name: "Kevin Gabriel Gomes da Silva", attendance: { "11/05": "P", "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "P", "08/06 - 2º T": "P" } },
                { id: 802013, name: "Lara Maria de Sousa Soares", attendance: { "11/05": "P", "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "P", "08/06 - 2º T": "P" } },
                { id: 802014, name: "Lara Monteiro dos Santos", attendance: { "11/05": "P", "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "F", "25/05 - 2º T": "F", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "P", "08/06 - 2º T": "P" } },
                { id: 802015, name: "Lara Vieira de Andrade", attendance: { "11/05": "P", "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "F", "25/05 - 2º T": "F", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "P", "08/06 - 2º T": "P" } },
                { id: 802016, name: "Lavinnya de Souza de Araújo", attendance: { "11/05": "F", "18/05 - 1º T": "F", "18/05 - 2º T": "F", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "P", "08/06 - 2º T": "P" } },
                { id: 802017, name: "Laysa Ambrozio Claudio", attendance: { "11/05": "P", "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "P", "08/06 - 2º T": "P" } },
                { id: 802018, name: "Leticia Costa Santos", attendance: { "11/05": "P", "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "F", "08/06 - 2º T": "F" } },
                { id: 802019, name: "Livia Duarte Soares de Lima", attendance: { "11/05": "P", "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "P", "08/06 - 2º T": "P" } },
                { id: 802020, name: "Livia Fernandes Gaiani", attendance: { "11/05": "P", "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "P", "08/06 - 2º T": "P" } },
                { id: 802021, name: "Luis Fernando Amorim de Deus", attendance: { "11/05": "P", "18/05 - 1º T": "F", "18/05 - 2º T": "F", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "P", "08/06 - 2º T": "P" } },
                { id: 802022, name: "Manuela Figueiredo da Silva", attendance: { "11/05": "P", "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "P", "08/06 - 2º T": "P" } },
                { id: 802023, name: "Manuela Ribeiro dos Santos", attendance: { "11/05": "P", "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "P", "25/05 - 2º T": "P", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "F", "08/06 - 2º T": "F" } },
                { id: 802024, name: "Manuella Magalhães Martins", attendance: { "11/05": "F", "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "F", "25/05 - 2º T": "F", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "P", "08/06 - 2º T": "P" } },
                { id: 802025, name: "Maria Rita de Jesus Sergio", attendance: { "11/05": "P", "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "F", "25/05 - 2º T": "F", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "P", "08/06 - 2º T": "P" } },
                { id: 802026, name: "Mellyna Santos Spatafora", attendance: { "11/05": "P", "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "F", "25/05 - 2º T": "F", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "P", "08/06 - 2º T": "P" } },
                { id: 802027, name: "Sophia Oliveira Ribeiro", attendance: { "11/05": "P", "18/05 - 1º T": "P", "18/05 - 2º T": "P", "25/05 - 1º T": "F", "25/05 - 2º T": "F", "01/06 - 1º T": "P", "01/06 - 2º T": "P", "08/06 - 1º T": "P", "08/06 - 2º T": "P" } }
              ];

              const studs802 = migratedClasses["802"].students || [];
              const hasAttendanceMismatch802 = studs802.length !== 28 || studs802.some((s: any) => {
                const corr = correctStudents802.find(c => c.id === s.id);
                if (!corr) return true;
                return !s.attendance || !s.attendance["08/06 - 1º T"];
              });

              if (hasAttendanceMismatch802) {
                migratedClasses["802"].students = correctStudents802;
                needsUpdateRemote = true;
              }
            }

            // REMOVE UNAUTHORIZED SCHOOLS (User request: Only 4 specific schools)
            const allowedSchools = ["CIEP 476", "CIEP 320", "EE Cordelia Paiva", "CIEP 198", "CIEP 369"];
            const initialClassCount = Object.keys(migratedClasses).length;
            migratedClasses = Object.fromEntries(
              Object.entries(migratedClasses).filter(([id, data]) => {
                return data.school && allowedSchools.includes(data.school);
              })
            );

            if (Object.keys(migratedClasses).length !== initialClassCount) {
              needsUpdateRemote = true;
            }

            if (Object.keys(migratedClasses).length !== initialClassCount) {
              needsUpdateRemote = true;
            }
          
            if (needsUpdateRemote) {
            saveClassesToFirestore(migratedClasses);
          }
          setClassData(migratedClasses);
        } else if (!hasLoadedClasses.current) {
          // If Firestore is empty, initialize with local/blueprint data
          const stored = localStorage.getItem('app_classData');
          let dataToSave = stored ? JSON.parse(stored) : initialClassData;
          saveClassesToFirestore(dataToSave);
          setClassData(dataToSave);
        }
        hasLoadedClasses.current = true;
      });

      // Subscribe to gallery
      const unsubGallery = subscribeToGallery((firebaseGallery) => {
        if (firebaseGallery && firebaseGallery.images) {
          isRemoteGalleryUpdate.current = true;
          setGalleryData(firebaseGallery);
        } else if (!hasLoadedGallery.current) {
          const stored = localStorage.getItem('app_galleryData');
          if (stored) {
            const dataToSave = JSON.parse(stored);
            saveGalleryToFirestore(dataToSave);
            setGalleryData(dataToSave);
          }
        }
        hasLoadedGallery.current = true;
      });

      return () => {
        clearTimeout(safetyTimeout);
        unsubClasses();
        unsubGallery();
      };
    } else {
      clearTimeout(safetyTimeout);
      setIsInitializing(false);
    }
  }, []);

  // Hardware Back Button Handling
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      // Prevent default back behavior if we can handle it internally
      if (selectedClassId) {
        setSelectedClassId(null);
        window.history.pushState({ app: 'classes_grade' }, '', window.location.pathname);
      } else if (selectedGrade) {
        setSelectedGrade(null);
        window.history.pushState({ app: 'classes_home' }, '', window.location.pathname);
      } else if (currentView !== 'home') {
        setView('home');
        window.history.pushState({ app: 'home' }, '', window.location.pathname);
      } else {
        // If at home, push state again to prevent exiting the app
        window.history.pushState({ app: 'home' }, '', window.location.pathname);
      }
    };

    window.addEventListener('popstate', handlePopState);
    
    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentView, selectedGrade, selectedClassId]);

  const goBack = () => {
    if (selectedClassId) {
        setSelectedClassId(null);
    } else if (selectedGrade) {
        setSelectedGrade(null);
    } else {
        setView('home');
    }
  };

  const setViewWithHistory = (v: ViewState) => {
    resetClassesNav(); 
    setView(v);
  };

  const resetClassesNav = () => {
    setSelectedGrade(null);
    setSelectedClassId(null);
  };

  const renderView = () => {
    switch(currentView) {
      case 'home': return <DashboardView setView={setViewWithHistory} classData={classData} />;
      case 'statistics': return <StatisticsView classData={classData} onBack={goBack} />;
      case 'classes': return (
        <ClassesView 
          classData={classData} 
          setClassData={setClassData} 
          onBack={goBack}
          selectedGrade={selectedGrade}
          setSelectedGrade={setSelectedGrade}
          selectedClassId={selectedClassId}
          setSelectedClassId={setSelectedClassId}
          onSave={handleSaveClasses}
          syncStatus={syncStatus}
        />
      );
      case 'ementa': return <EmentaView onBack={goBack} />;
      case 'plano': return <PlanoDeCursoView onBack={goBack} />;
      case 'schedule': return <ScheduleView onBack={goBack} />;
      case 'gallery': return (
        <GalleryView 
          onBack={goBack} 
          data={galleryData} 
          setData={setGalleryData} 
        />
      );
      case 'profile': return (
        <Profile 
          user={mockUserProfile} 
          onBack={goBack} 
          classData={classData}
          setClassData={setClassData}
          onLogout={() => {
            setAccessLevel('portal');
            setView('home');
          }}
          onNavigateToStudents={() => setView('alunos-view')}
        />
      );
      case 'alunos-view': return (
        <AlunosView 
          onBack={goBack} 
          classData={classData}
        />
      );
      case 'decolonial': return <DecolonialApp onBack={goBack} setSlideViewerOpen={setSlideViewerOpen} />;
      case 'calendar': return <CalendarView onBack={goBack} />;
      case 'daily-activities': return (
        <DailyActivityLogView 
          classData={classData} 
          onBack={goBack} 
          setClassData={setClassData}
          onSave={handleSaveClasses}
        />
      );
      default: return <DashboardView setView={setViewWithHistory} classData={classData} />;
    }
  };

  const getTitle = () => {
     switch(currentView) {
      case 'home': return 'Início';
      case 'statistics': return 'Estatísticas';
      case 'classes': 
        if (selectedClassId && classData[selectedClassId]) return classData[selectedClassId].name.toUpperCase();
        if (selectedGrade) return `${selectedGrade}º ANO`;
        return 'Turmas';
      case 'ementa': return 'Ementa Escolar';
      case 'plano': return 'Plano de Curso';
      case 'schedule': return 'Quadro de Horários';
      case 'gallery': return 'Galeria';
      case 'profile': return 'Perfil';
      case 'decolonial': return 'Gestão do Professor';
      case 'calendar': return 'Calendário';
      case 'daily-activities': return 'Registro Diário';
      default: return 'Painel';
    }
  };

  // Slide Viewer State
  const [slideViewerOpen, setSlideViewerOpen] = useState<{ type: 'corpo-midia' | 'altinha-futvolei' } | null>(null);

  useEffect(() => {
    (window as any).openSlideViewer = (type: 'corpo-midia' | 'altinha-futvolei') => setSlideViewerOpen({ type });
  }, []);

  // ... (existing code for App)

  if (isInitializing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#fdfaf6] text-slate-800 font-sans p-6 text-center">
        <div className="w-16 h-16 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mb-6 shadow-md"></div>
        <h1 className="text-2xl font-black uppercase tracking-tighter mb-2">Iniciando Sync de Dados</h1>
        <p className="text-slate-500 font-medium animate-pulse">Sincronizando com a Nuvem...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen relative font-sans">
      {/* Slide Viewer Global Overlay */}
      {slideViewerOpen && (
        <SlideViewer 
          onClose={() => setSlideViewerOpen(null)} 
          slideType={slideViewerOpen.type} 
        />
      )}

      {/* Global Background */}
      <BackgroundSlider />
      
      {accessLevel === 'portal' && (
        <PortalView onSelectAccess={(level) => setAccessLevel(level)} />
      )}

      {accessLevel === 'alunos' && (
        <AlunosView 
          onBack={() => setAccessLevel('portal')} 
          classData={classData}
        />
      )}

      {accessLevel === 'professor_login' && (
        <ProfessorLoginView 
          onBack={() => setAccessLevel('portal')} 
          onSuccess={() => {
            setAccessLevel('professor');
            setView('home');
          }} 
        />
      )}

      {/* Wrapper for Content + Footer */}
      {accessLevel === 'professor' && (
      <div className="flex-1 flex flex-col z-10">
        
          <div className="flex-1 flex flex-col">
             
             {/* Sidebar */}
             <Sidebar 
               isOpen={isSidebarOpen} 
               onClose={() => setSidebarOpen(false)} 
               currentView={currentView}
               setView={(v) => { resetClassesNav(); setView(v); }}
             />

             {/* Header */}
             <header className="bg-black/80 backdrop-blur-md border-b border-white/10 h-16 flex items-center px-4 sticky top-0 z-30 shadow-2xl shrink-0 transition-all duration-300 text-white">
               <button 
                 onClick={() => setSidebarOpen(true)}
                 className="p-2 mr-3 rounded-xl bg-white/5 hover:bg-white/10 text-white focus:outline-none transition-all active:scale-90 border border-white/10 shadow-lg"
               >
                 <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                 </svg>
               </button>
               
               <div className="flex items-center gap-3">
                 <div className="flex flex-col justify-center">
                   <h1 className="text-base md:text-lg font-black leading-tight tracking-tighter uppercase">{currentView === 'home' ? 'PORTAL PEDAGÓGICO' : getTitle()}</h1>
                   <p className="text-[9px] md:text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] truncate">
                     {currentView === 'home' ? 'Prof. André Brito' : 'MÓDULO DE GESTÃO'}
                   </p>
                 </div>
               </div>
               
               <div className="ml-auto flex items-center gap-2 md:gap-5">
                  <div className="hidden sm:block">
                    <SyncStatusIndicator status={syncStatus} />
                  </div>
                  <WeatherWidget />
               </div>
             </header>

             {/* Main Content Area (Naturally Scrollable) */}
             <main className="flex-1 p-3 md:p-6 pb-20 md:pb-6">
               <div className="w-full pb-6">
                  {currentView === 'home' ? (
                    <DashboardView setView={setViewWithHistory} classData={classData} />
                  ) : renderView()}
               </div>
             </main>

             <BottomNav 
               currentView={currentView} 
               setView={setViewWithHistory} 
             />
             
          </div>
      </div>
      )}

      {/* Global Footer (Always visible, unless viewing slides) */}
      {!slideViewerOpen && accessLevel === 'professor' && <GlobalFooter />}
    </div>
  );
};

export default App;