import { Server, LogOut, MailQuestion, ChevronUp, Diff, Ticket, Scroll, MessageSquare, Shield, ArrowLeft, FishOff } from "lucide-react";
 
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu"
import { useGuildId } from "@/hooks"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Link } from "@/i18n/routing";
import type { Session } from "next-auth";
 
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const id = useGuildId();
  const { data } = useSession();

  const items = [
    {
      title: "Anti-Phishing",
      url: `/${id}/features/antiphishing`,
      icon: FishOff,
    },
    {
      title: "AutoMod",
      url: `/${id}/features/automod`,
      icon: Shield,
    },
    {
      title: "Confessions",
      url: `/${id}/features/confessions`,
      icon: MailQuestion,
    },
    {
      title: "Goodbye",
      url: `/${id}/features/goodbye`,
      icon: MessageSquare,
    },
    {
      title: "Levelling",
      url: `/${id}/features/levelling`,
      icon: Diff,
    },
    {
      title: "Moderation Logs",
      url: `/${id}/features/logs`,
      icon: Scroll,
    },
    {
      title: "Tickets",
      url: `/${id}/features/tickets`,
      icon: Ticket,
    },
    {
      title: "Welcome",
      url: `/${id}/features/welcome`,
      icon: MessageSquare,
    },
  ];

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader className="text-white">
        <SidebarMenu>
          <SidebarMenuItem>
            <h1 className="font-mono font-semibold p-2 text-center">Evelyn | Dashboard [BETA]</h1>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton size='lg' className="hover:text-white" asChild>
              <Link href="/pickaguild">
                <ArrowLeft />
                <h1 className="font-sans font-semibold">Back to Server Selection</h1>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="text-white font-sans">
        <SidebarGroup>
          <SidebarGroupLabel className="text-dimWhite">Features</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton className="hover:text-white" asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SideUser data={data as Session} />
      </SidebarFooter>
    </Sidebar>
  )
}

function SideUser({ data }: { data: Session }) {
    const { isMobile } = useSidebar();
    const router = useRouter();

    return (
      <SidebarMenu>
          <SidebarMenuItem>
              <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton
                      size="lg"
                      className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    >
                      <Avatar className='h-8 w-8 rounded-xl'>
                        <AvatarFallback>SP</AvatarFallback>
                        <AvatarImage src={data?.user.avatarURL as string} />
                      </Avatar>
                      <p className="text-white font-sans text-left font-semibold">{data?.user.name}</p>
                      <ChevronUp className="ml-auto size-4 text-white" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-black text-white"
                    side={isMobile ? "bottom" : "right"}
                    align="end"
                    sideOffset={4}
                  >
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => router.push('/pickaguild')}
                    >
                      <Server className="mr-1 w-[16px] h-[16px]" />
                      Servers
                    </DropdownMenuItem>
                    {process.env.NEXT_PUBLIC_OWNER_ID === data?.user.id ? (
                      <DropdownMenuItem 
                        className="cursor-pointer"
                        onClick={() => router.push('/internal-dev')}
                      >
                        <MailQuestion className="mr-1 w-[16px] h-[16px]" />
                        Developer Panel
                      </DropdownMenuItem>
                    ) : <></>}
                    <DropdownMenuItem 
                      className="cursor-pointer"
                      onClick={() => signOut()}
                    >
                    <LogOut className="mr-1 w-[16px] h-[16px]" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
          </SidebarMenuItem>
      </SidebarMenu>
    )
}