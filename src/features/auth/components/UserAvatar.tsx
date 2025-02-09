"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { DottedSeparator } from "@/components/dotted-separator";
import { useCurrent } from "../api/useCurrent";
import { Loader, LogOut } from "lucide-react";

export const UserAvatar = () => {
  const { data, isLoading } = useCurrent();
  console.log("DATA", data);

  if(isLoading){
    return (
      <div className="size-10 rounded-full flex items-center bg-neutrual-200 border border-neutral-300">
        <Loader className="size-4 animate-spin text-muted-foreground"/>
      </div>
    )
  }
  if(!data) return null;
  const { name, email } = data;

  const avatarFallback = name ? name.charAt(0).toUpperCase() 
        : email.charAt(0).toUpperCase() ?? "U";

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative">
        <Avatar className="size-10 hover:opacity-75 transition border border-neutral-300">
          <AvatarFallback className="bg-neutral-200 font-medium text-neutral-500 flex items-center justify-center w-full h-full">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="bottom" className="w-60" sideOffset={10}>
        <div className="flex flex-col items-center justify-center gap-2 px-2.5 py-4">
          <Avatar className="size-10 hover:opacity-75 transition border border-neutral-300">
            <AvatarFallback className="bg-neutral-200 font-medium text-neutral-500 flex items-center justify-center w-full h-full rounded-full">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center justify-center">
            <p className="text-sm font-medium text-neutral-900">
              { name || "User" }
            </p>
            <p className="text-xs text-neutral-500">{email}</p>
          </div>
        </div>
        <DottedSeparator />
        <DropdownMenuItem className="h-10 flex items-center justify-center text-amber-700 font-medium cursor-pointer">
          <LogOut className="size-4 mr-2"/>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>

    </DropdownMenu>
  )


}

