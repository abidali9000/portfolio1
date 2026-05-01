import { Card, CardContent } from "@/components/ui/card"
import { PageHeader } from "@/components/admin/page-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DeleteButton } from "@/components/admin/delete-button"
import { createServerSupabase } from "@/lib/supabase/server"
import { isSupabaseConfigured } from "@/lib/env"
import { deleteLeadAction, updateLeadStatusAction } from "@/app/admin/(panel)/actions"
import type { Lead } from "@/lib/supabase/types"

const STATUS_VARIANT: Record<Lead["status"], string> = {
  new: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
  in_progress: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  won: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  lost: "bg-muted text-muted-foreground",
}

async function fetchLeads(): Promise<Lead[]> {
  if (!isSupabaseConfigured) return []
  const supabase = await createServerSupabase()
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })
  if (error) throw error
  return (data ?? []) as Lead[]
}

export default async function AdminLeadsPage() {
  const leads = await fetchLeads()
  return (
    <div>
      <PageHeader
        title="Leads"
        description="Every contact-form submission lands here. Triage, mark won/lost, take notes."
      />

      {leads.length === 0 ? (
        <Card>
          <CardContent className="p-10 text-center text-sm text-muted-foreground">
            No leads yet. The contact form will deposit submissions here.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3">
          {leads.map(l => (
            <Card key={l.id}>
              <CardContent className="p-5 space-y-3">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-base">{l.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {l.email}
                      {l.company && ` · ${l.company}`}
                      {" · "}
                      {new Date(l.created_at).toLocaleString()}
                    </p>
                  </div>
                  <Badge className={STATUS_VARIANT[l.status]}>
                    {l.status === "in_progress" ? "In progress" : l.status[0].toUpperCase() + l.status.slice(1)}
                  </Badge>
                </div>

                <div className="grid gap-2 text-xs sm:grid-cols-3">
                  {l.service && <div><span className="text-muted-foreground">Service:</span> {l.service}</div>}
                  {l.budget && <div><span className="text-muted-foreground">Budget:</span> {l.budget}</div>}
                  {l.timeline && <div><span className="text-muted-foreground">Timeline:</span> {l.timeline}</div>}
                </div>

                <p className="text-sm whitespace-pre-line">{l.message}</p>

                <div className="flex flex-wrap items-center gap-2 pt-2">
                  {(["new", "in_progress", "won", "lost"] as const).map(status => (
                    <form key={status} action={updateLeadStatusAction.bind(null, l.id, status)}>
                      <Button
                        type="submit"
                        variant={l.status === status ? "default" : "outline"}
                        size="sm"
                      >
                        Mark {status === "in_progress" ? "in progress" : status}
                      </Button>
                    </form>
                  ))}
                  <a
                    href={`mailto:${l.email}?subject=Re:%20your%20enquiry&body=Hi%20${encodeURIComponent(l.name.split(" ")[0])}%2C`}
                    className="inline-flex"
                  >
                    <Button variant="ghost" size="sm">Reply</Button>
                  </a>
                  <div className="ml-auto">
                    <DeleteButton size="icon" label="" action={deleteLeadAction.bind(null, l.id)} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
