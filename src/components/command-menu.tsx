"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { Search, FileText, User, CheckSquare, Loader2 } from "lucide-react";
import { searchGlobal } from "@/app/(dashboard)/search-actions";

export function CommandMenu({ open, setOpen }: { open: boolean, setOpen: (o: boolean) => void }) {
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [results, setResults] = React.useState<{ clients: any[], deals: any[], tasks: any[] }>({ clients: [], deals: [], tasks: [] });

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setOpen]);

  React.useEffect(() => {
    if (!open) {
      setQuery("");
      setResults({ clients: [], deals: [], tasks: [] });
      return;
    }
  }, [open]);

  React.useEffect(() => {
    if (query.length < 2) {
      setResults({ clients: [], deals: [], tasks: [] });
      return;
    }
    
    setLoading(true);
    const timeout = setTimeout(async () => {
      try {
        const data = await searchGlobal(query);
        setResults(data);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  const onSelect = (path: string) => {
    setOpen(false);
    router.push(path);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-start justify-center pt-[20vh] sm:pt-[25vh] p-4">
      {/* Оверлей закрытия по клику вне окна */}
      <div className="absolute inset-0 z-0" onClick={() => setOpen(false)} />
      
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col relative z-10 border border-gray-100">
        <Command className="flex flex-col h-full bg-white [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-gray-500" shouldFilter={false} loop>
          <div className="flex items-center px-4 border-b border-gray-100">
            <Search className="w-5 h-5 text-gray-400 shrink-0" />
            <Command.Input 
              value={query}
              onValueChange={setQuery}
              autoFocus
              placeholder="Поиск клиентов, сделок, задач..." 
              className="flex-1 px-4 py-4 bg-transparent outline-none text-gray-900 placeholder:text-gray-400"
            />
            {loading && <Loader2 className="w-5 h-5 text-gray-400 animate-spin shrink-0" />}
            <button onClick={() => setOpen(false)} className="text-[10px] font-medium text-gray-400 bg-gray-100 border border-gray-200 px-2 py-1 rounded ml-2">ESC</button>
          </div>

          <Command.List className="max-h-[400px] overflow-y-auto p-2">
            {!loading && query.length >= 2 && results.clients.length === 0 && results.deals.length === 0 && results.tasks.length === 0 && (
              <Command.Empty className="py-12 text-center text-sm text-gray-500">
                Ничего не найдено.
              </Command.Empty>
            )}

            {!loading && query.length < 2 && (
              <div className="py-12 text-center text-sm text-gray-500">
                Введите хотя бы 2 символа для поиска.
              </div>
            )}

            {results.clients.length > 0 && (
              <Command.Group heading="Клиенты" className="mb-2">
                {results.clients.map((c) => (
                  <Command.Item 
                    key={c.id} 
                    onSelect={() => onSelect('/clients')}
                    className="flex items-center gap-3 px-3 py-3 text-sm rounded-lg hover:bg-gray-100 aria-selected:bg-gray-100 cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                      <User className="w-4 h-4 text-gray-500" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900">{c.name}</span>
                      {c.company && <span className="text-gray-500 text-xs">{c.company}</span>}
                    </div>
                  </Command.Item>
                ))}
              </Command.Group>
            )}

            {results.deals.length > 0 && (
              <Command.Group heading="Сделки" className="mb-2">
                {results.deals.map((d) => (
                  <Command.Item 
                    key={d.id} 
                    onSelect={() => onSelect('/deals')}
                    className="flex items-center gap-3 px-3 py-3 text-sm rounded-lg hover:bg-gray-100 aria-selected:bg-gray-100 cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900">{d.title}</span>
                      {d.client && <span className="text-gray-500 text-xs">Клиент: {d.client.name}</span>}
                    </div>
                  </Command.Item>
                ))}
              </Command.Group>
            )}

            {results.tasks.length > 0 && (
              <Command.Group heading="Задачи" className="mb-2">
                {results.tasks.map((t) => (
                  <Command.Item 
                    key={t.id} 
                    onSelect={() => onSelect('/tasks')}
                    className="flex items-center gap-3 px-3 py-3 text-sm rounded-lg hover:bg-gray-100 aria-selected:bg-gray-100 cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                      <CheckSquare className="w-4 h-4 text-orange-600" />
                    </div>
                    <span className="font-medium text-gray-900">{t.title}</span>
                  </Command.Item>
                ))}
              </Command.Group>
            )}
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
