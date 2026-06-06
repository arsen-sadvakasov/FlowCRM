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
      
      <div className="w-full max-w-2xl bg-card rounded-xl shadow-2xl overflow-hidden flex flex-col relative z-10 border border-border">
        <Command className="flex flex-col h-full bg-card [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-muted-foreground" shouldFilter={false} loop>
          <div className="flex items-center px-4 border-b border-border">
            <Search className="w-5 h-5 text-muted-foreground shrink-0" />
            <Command.Input 
              value={query}
              onValueChange={setQuery}
              autoFocus
              placeholder="Поиск клиентов, сделок, задач..." 
              className="flex-1 px-4 py-4 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
            />
            {loading && <Loader2 className="w-5 h-5 text-muted-foreground animate-spin shrink-0" />}
            <button onClick={() => setOpen(false)} className="text-[10px] font-medium text-muted-foreground bg-muted border border-border px-2 py-1 rounded ml-2">ESC</button>
          </div>

          <Command.List className="max-h-[400px] overflow-y-auto p-2">
            {!loading && query.length >= 2 && results.clients.length === 0 && results.deals.length === 0 && results.tasks.length === 0 && (
              <Command.Empty className="py-12 text-center text-sm text-muted-foreground">
                Ничего не найдено.
              </Command.Empty>
            )}

            {!loading && query.length < 2 && (
              <div className="py-12 text-center text-sm text-muted-foreground">
                Введите хотя бы 2 символа для поиска.
              </div>
            )}

            {results.clients.length > 0 && (
              <Command.Group heading="Клиенты" className="mb-2">
                {results.clients.map((c) => (
                  <Command.Item 
                    key={c.id} 
                    onSelect={() => onSelect('/clients')}
                    className="flex items-center gap-3 px-3 py-3 text-sm rounded-lg hover:bg-accent aria-selected:bg-accent cursor-pointer transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                      <User className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-foreground">{c.name}</span>
                      {c.company && <span className="text-muted-foreground text-xs">{c.company}</span>}
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
                    className="flex items-center gap-3 px-3 py-3 text-sm rounded-lg hover:bg-accent aria-selected:bg-accent cursor-pointer transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-foreground">{d.title}</span>
                      {d.client && <span className="text-muted-foreground text-xs">Клиент: {d.client.name}</span>}
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
                    className="flex items-center gap-3 px-3 py-3 text-sm rounded-lg hover:bg-accent aria-selected:bg-accent cursor-pointer transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0">
                      <CheckSquare className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                    </div>
                    <span className="font-medium text-foreground">{t.title}</span>
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
