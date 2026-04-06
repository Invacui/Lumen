import { useMemo, useState } from 'react';
import { CheckCircle2, Landmark } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface BankItem {
  id: string;
  name: string;
}

const BANKS: BankItem[] = [
  { id: 'horizon-bank', name: 'Horizon Bank' },
  { id: 'nova-finance', name: 'Nova Finance' },
  { id: 'zenith-credit', name: 'Zenith Credit Union' },
  { id: 'riverline-bank', name: 'Riverline Bank' },
];

export default function FinanceBankConnectPage() {
  const [connectedBankId, setConnectedBankId] = useState<string | null>(null);
  const [activeBankId, setActiveBankId] = useState<string | null>(null);
  const [demoKey, setDemoKey] = useState('');

  const activeBank = useMemo(
    () => BANKS.find((bank) => bank.id === activeBankId) ?? null,
    [activeBankId],
  );

  const openConnectDialog = (bankId: string) => {
    setActiveBankId(bankId);
    const randomKey = String(Math.floor(100000 + Math.random() * 900000));
    setDemoKey(randomKey);
  };

  const handleConnect = () => {
    if (!activeBank) return;
    setConnectedBankId(activeBank.id);
    setActiveBankId(null);
    toast.success(`${activeBank.name} connected`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Connect your bank</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          You can connect your bank to auto record your transaction history.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {BANKS.map((bank) => {
          const isConnected = bank.id === connectedBankId;
          return (
            <Card
              key={bank.id}
              className={
                isConnected
                  ? 'border-emerald-500/70 bg-emerald-500/10'
                  : 'border-white/10 bg-[#0f1117]'
              }
            >
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between text-base text-white">
                  <span className="flex items-center gap-2">
                    <Landmark className="h-4 w-4" />
                    {bank.name}
                  </span>
                  {isConnected && <CheckCircle2 className="h-4 w-4 text-emerald-400" />}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  {isConnected
                    ? 'Connected. Transactions from this bank will be auto recorded.'
                    : 'Connect this bank account using demo authorization key.'}
                </p>
                <Button
                  className="w-full bg-purple-400/20 hover:bg-purple-400/20"
                  variant={isConnected ? 'secondary' : 'ghost'}
                  onClick={() => openConnectDialog(bank.id)}
                >
                  {isConnected ? 'Reconnect' : 'Connect Bank'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Dialog open={!!activeBank} onOpenChange={(open) => !open && setActiveBankId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Demo Bank Connection</DialogTitle>
            <DialogDescription>
              Enter the demo key and click okay to connect {activeBank?.name}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Demo key (random number)</p>
            <Input value={demoKey} onChange={(event) => setDemoKey(event.target.value)} />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setActiveBankId(null)}>
              Cancel
            </Button>
            <Button onClick={handleConnect}>Okay</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
