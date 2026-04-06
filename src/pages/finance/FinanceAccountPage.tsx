import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAppSelector } from '@/store/hooks';
import { selectFinanceRole, selectFinanceUser } from '@/store/financeAuth.slice';

export default function FinanceAccountPage() {
  const user = useAppSelector(selectFinanceUser);
  const role = useAppSelector(selectFinanceRole);

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'LU';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">User Panel</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          View your account details and role information.
        </p>
      </div>

      <Card className="border-white/10 bg-[#0f1117]">
        <CardHeader>
          <CardTitle className="text-white">Account Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14">
              <AvatarImage src={user?.picture ?? ''} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <p className="text-base font-semibold text-white">{user?.name ?? 'Lumen User'}</p>
              <p className="text-sm text-muted-foreground">{user?.email ?? 'Not available'}</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-white/10 p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Current role</p>
              <div className="mt-2">
                <Badge variant="secondary">{role === 'admin' ? 'Admin' : 'Viewer'}</Badge>
              </div>
            </div>
            <div className="rounded-lg border border-white/10 p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Workspace</p>
              <p className="mt-2 text-sm text-white">Lumen Expense Tracker</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
