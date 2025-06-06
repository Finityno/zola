"use client"

import { HistoryTrigger } from "@/app/components/history/history-trigger"
import { AppInfoTrigger } from "@/app/components/layout/app-info/app-info-trigger"
import { ButtonNewChat } from "@/app/components/layout/button-new-chat"
import { UserMenu } from "@/app/components/layout/user-menu"
import { useBreakpoint } from "@/app/hooks/use-breakpoint"
import { useUser } from "@/app/providers/user-provider"
import type { Agent } from "@/app/types/agent"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"
import { useAgent } from "@/lib/agent-store/hooks"
import { APP_NAME } from "@/lib/config"
import { Info } from "@phosphor-icons/react"
import Link from "next/link"
import { AgentLink } from "./agent-link"
import { DialogPublish } from "./dialog-publish"
import { HeaderSidebarTrigger } from "./header-sidebar-trigger"

export type AgentHeader = Pick<
  Agent,
  "name" | "description" | "avatar_url" | "slug"
>

export function Header({ hasSidebar }: { hasSidebar: boolean }) {
  const isMobile = useBreakpoint(768)
  const { user } = useUser()
  const { agent } = useAgent()
  const { open: isSidebarOpen } = useSidebar()

  const isLoggedIn = !!user

  const showHeaderHistoryTrigger = !isMobile && (!hasSidebar || !isSidebarOpen);

  return (
    <header className="h-app-header pointer-events-none fixed top-0 right-0 left-0 z-50">
      {/* <div className="h-app-header top-app-header bg-background pointer-events-none absolute left-0 z-50 mx-auto w-full to-transparent backdrop-blur-xl [-webkit-mask-image:linear-gradient(to_bottom,black,transparent)] lg:hidden"></div> */}
      <div className="relative mx-auto flex h-full max-w-full items-center justify-between bg-transparent px-4 sm:px-6 lg:bg-transparent lg:px-8">
        <div className="flex flex-1 items-center justify-between">
          <div className="flex flex-1 items-center gap-2">
            {hasSidebar && <HeaderSidebarTrigger />}
            {Boolean(!agent || !isMobile) && (
              <div className="flex-1">
                <Link
                  href="/"
                  className="pointer-events-auto text-xl font-medium tracking-tight"
                >
                  {APP_NAME}
                </Link>
              </div>
            )}
          </div>
          <div />
          {!isLoggedIn ? (
            <div className="pointer-events-auto flex flex-1 items-center justify-end gap-4">
              <AppInfoTrigger
                trigger={
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-background hover:bg-muted text-muted-foreground h-8 w-8 rounded-full"
                    aria-label={`About ${APP_NAME}`}
                  >
                    <Info className="size-4" />
                  </Button>
                }
              />
              <AgentLink />
              <Link
                href="/auth"
                className="font-base text-muted-foreground hover:text-foreground text-base transition-colors"
              >
                Login
              </Link>
            </div>
          ) : (
            <div className="pointer-events-auto flex flex-1 items-center justify-end gap-2">
              {agent && <DialogPublish agent={agent} />}
              <ButtonNewChat />
              <AgentLink />
              {showHeaderHistoryTrigger && (
                <HistoryTrigger
                  hasSidebar={false}
                />
              )}
              <UserMenu />
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
