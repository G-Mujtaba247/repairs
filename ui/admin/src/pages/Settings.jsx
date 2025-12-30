import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Settings() {
    return (
        <div className="space-y-6 max-w-4xl">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
                <p className="text-muted-foreground">
                    Manage your account settings and preferences.
                </p>
            </div>
            <Separator />

            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Profile</CardTitle>
                        <CardDescription>
                            Update your personal information.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" defaultValue="Admin User" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" defaultValue="admin@example.com" />
                        </div>
                        <Button>Save Changes</Button>
                    </CardContent>
                </Card>

                {/* <Card>
                    <CardHeader>
                        <CardTitle>Notifications</CardTitle>
                        <CardDescription>
                            Configure how you receive notifications.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <Label className="text-base">Email Notifications</Label>
                                <p className="text-sm text-muted-foreground">
                                    Receive emails about new repair requests.
                                </p>
                            </div>
                            <input type="checkbox" className="h-4 w-4 accent-primary" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <Label className="text-base">Marketing Emails</Label>
                                <p className="text-sm text-muted-foreground">
                                    Receive emails about new features and offers.
                                </p>
                            </div>
                            <input type="checkbox" className="h-4 w-4 accent-primary" />
                        </div>
                    </CardContent>
                </Card> */}

                <WebsiteSettings />
            </div>
        </div>
    );
}

function WebsiteSettings() {
    const [socials, setSocials] = React.useState([
        { id: 1, platform: 'Facebook', url: 'https://facebook.com' },
        { id: 2, platform: 'Twitter', url: 'https://twitter.com' },
    ]);

    const addSocial = () => {
        setSocials([...socials, { id: Date.now(), platform: '', url: '' }]);
    };

    const removeSocial = (id) => {
        setSocials(socials.filter(s => s.id !== id));
    };

    const updateSocial = (id, field, value) => {
        setSocials(socials.map(s => s.id === id ? { ...s, [field]: value } : s));
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Website Settings</CardTitle>
                <CardDescription>
                    Manage global website settings like footer content.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="mb-2">
                    <Label htmlFor="appname">App name</Label>
                    <Input id="appname" placeholder="Your application name" />
                </div>
                <div className="my-2">
                    <Label htmlFor="applogo">App Logo</Label>
                    <Input type="file" id="applogo" />
                </div>

                <div className="my-2">
                    <Label htmlFor="copyright">Copyright Text</Label>
                    <Input id="copyright" placeholder="Your copyright text" />
                </div>

                <div className="my-5">
                    <div className="my-2 mb-5 flex items-center justify-between">
                        <Label>Social Media Links</Label>
                        <Button variant="outline" size="sm" onClick={addSocial}>Add Link</Button>
                    </div>
                    <div className="space-y-3">
                        {socials.map((social) => (
                            <div key={social.id} className="flex gap-2">
                                <Input
                                    placeholder="Platform (e.g. Facebook)"
                                    value={social.platform}
                                    onChange={(e) => updateSocial(social.id, 'platform', e.target.value)}
                                    className="w-1/3"
                                />
                                <Input
                                    placeholder="URL"
                                    value={social.url}
                                    onChange={(e) => updateSocial(social.id, 'url', e.target.value)}
                                    className="flex-1"
                                />
                                <Button variant="ghost" size="icon" className="text-destructive" onClick={() => removeSocial(social.id)}>
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
                <Button>Save Website Settings</Button>
            </CardContent>
        </Card>
    );
}
import { Trash2 } from 'lucide-react';
