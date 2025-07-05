"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"
import { useTranslations } from 'next-intl'

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const t = useTranslations('navigation')
  const tProjects = useTranslations('projects')

  // This is sample data with translations
  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    teams: [
      {
        name: "Acme Inc",
        logo: GalleryVerticalEnd,
        plan: "Enterprise",
      },
      {
        name: "Acme Corp.",
        logo: AudioWaveform,
        plan: "Startup",
      },
      {
        name: "Evil Corp.",
        logo: Command,
        plan: "Free",
      },
    ],
    navMain: [
      {
        title: t('playground'),
        url: "#",
        icon: SquareTerminal,
        isActive: true,
        items: [
          {
            title: t('history'),
            url: "#",
          },
          {
            title: t('starred'),
            url: "#",
          },
          {
            title: t('settings'),
            url: "#",
          },
        ],
      },
      {
        title: t('models'),
        url: "#",
        icon: Bot,
        items: [
          {
            title: t('genesis'),
            url: "#",
          },
          {
            title: t('explorer'),
            url: "#",
          },
          {
            title: t('quantum'),
            url: "#",
          },
        ],
      },
      {
        title: t('documentation'),
        url: "#",
        icon: BookOpen,
        items: [
          {
            title: t('introduction'),
            url: "#",
          },
          {
            title: t('getStarted'),
            url: "#",
          },
          {
            title: t('tutorials'),
            url: "#",
          },
          {
            title: t('changelog'),
            url: "#",
          },
        ],
      },
      {
        title: t('settings'),
        url: "#",
        icon: Settings2,
        items: [
          {
            title: t('general'),
            url: "#",
          },
          {
            title: t('team'),
            url: "#",
          },
          {
            title: t('billing'),
            url: "#",
          },
          {
            title: t('limits'),
            url: "#",
          },
        ],
      },
    ],
    projects: [
      {
        name: tProjects('designEngineering'),
        url: "#",
        icon: Frame,
      },
      {
        name: tProjects('salesMarketing'),
        url: "#",
        icon: PieChart,
      },
      {
        name: tProjects('travel'),
        url: "#",
        icon: Map,
      },
    ],
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
