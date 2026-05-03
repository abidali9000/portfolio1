import { PageHeader } from "@/components/admin/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { ImageInput } from "@/components/admin/image-input"
import { getSiteSettings } from "@/lib/cms/queries"
import { updateSiteSettingsAction } from "@/app/admin/(panel)/actions"

export default async function AdminSettingsPage() {
  const s = await getSiteSettings()
  return (
    <div>
      <PageHeader
        title="Site settings"
        description="Brand, contact details, social links, availability — all the fields that show up across the public site."
      />

      <form action={updateSiteSettingsAction} className="space-y-6">
        <Card>
          <CardContent className="p-5 grid gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="brand_name">Brand name *</Label>
              <Input id="brand_name" name="brand_name" defaultValue={s.brand_name} required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="tagline">Tagline</Label>
              <Input id="tagline" name="tagline" defaultValue={s.tagline ?? ""} />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <Label htmlFor="bio">Short bio</Label>
              <Textarea id="bio" name="bio" rows={3} defaultValue={s.bio ?? ""} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 grid gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" defaultValue={s.email ?? ""} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" defaultValue={s.phone ?? ""} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" defaultValue={s.location ?? ""} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="hourly_rate">Hourly rate</Label>
              <Input id="hourly_rate" name="hourly_rate" defaultValue={s.hourly_rate ?? ""} placeholder="$45/hr" />
            </div>
            <label className="flex items-center justify-between rounded-lg border border-border p-3 cursor-pointer md:col-span-2">
              <span>
                <span className="block text-sm font-medium">Available for new work</span>
                <span className="block text-xs text-muted-foreground">Toggles the &ldquo;available&rdquo; pill in the hero.</span>
              </span>
              <Switch name="available_for_work" defaultChecked={s.available_for_work} />
            </label>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <ImageInput
                name="avatar_url"
                label="Avatar / hero image"
                aspect="portrait"
                defaultValue={s.avatar_url ?? ""}
                hint="Displayed in the hero on the home page and on /about."
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="resume_url">Resume / CV URL</Label>
              <Input id="resume_url" name="resume_url" defaultValue={s.resume_url ?? ""} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="upwork_url">Upwork URL</Label>
              <Input id="upwork_url" name="upwork_url" defaultValue={s.upwork_url ?? ""} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="github_url">GitHub URL</Label>
              <Input id="github_url" name="github_url" defaultValue={s.github_url ?? ""} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="linkedin_url">LinkedIn URL</Label>
              <Input id="linkedin_url" name="linkedin_url" defaultValue={s.linkedin_url ?? ""} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="twitter_url">Twitter / X URL</Label>
              <Input id="twitter_url" name="twitter_url" defaultValue={s.twitter_url ?? ""} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="primary_color">Primary colour</Label>
              <Input id="primary_color" name="primary_color" type="text" defaultValue={s.primary_color ?? "#2563eb"} />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit">Save settings</Button>
        </div>
      </form>
    </div>
  )
}
