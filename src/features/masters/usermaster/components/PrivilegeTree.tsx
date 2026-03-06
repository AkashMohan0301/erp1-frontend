"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { ChevronRight, ChevronDown } from "lucide-react";
import { useState } from "react";

import { useAppSelector } from "@/store/hooks";
import { selectFormMode } from "@/store/authContextSlice";

import type { UserCompanyPrivilege } from "../userTypes";

interface Props {
  company: UserCompanyPrivilege
  companyName?: string

  modules: {
    moduleId: string
    moduleName: string
  }[]

  menus: {
    menuId: number
    menuName: string
    moduleId: string
  }[]

  buttons: {
    buttonId: string
    buttonName: string
    menuId: number
    moduleId: string
  }[]

  onChange: (updated: UserCompanyPrivilege) => void
}

export function PrivilegeTree({
  company,
  companyName,
  modules,
  menus,
  buttons,
  onChange
}: Props) {

  const mode = useAppSelector(selectFormMode)
  const isView = mode === "VIEW"

  const [openModules, setOpenModules] = useState<Record<string, boolean>>({})
  const [openMenus, setOpenMenus] = useState<Record<number, boolean>>({})

  /* ------------------------
     CHECK FUNCTIONS
  ------------------------ */

  const hasModule = (moduleId: string) =>
    company.modulePrivileges.some(m => m.moduleId === moduleId)

  const hasMenu = (menuId: number) =>
    company.menuPrivileges.some(m => m.menuId === menuId)

  const hasButton = (moduleId: string, menuId: number, buttonId: string) =>
    company.buttonPrivileges.some(
      b =>
        b.moduleId === moduleId &&
        b.menuId === menuId &&
        b.buttonId === buttonId
    )

  /* ------------------------
     MODULE TOGGLE
  ------------------------ */

  const toggleModule = (moduleId: string) => {

    if (isView) return

    const exists = hasModule(moduleId)

    if (exists) {

      onChange({
        ...company,
        modulePrivileges: company.modulePrivileges.filter(
          m => m.moduleId !== moduleId
        ),
        menuPrivileges: company.menuPrivileges.filter(
          m => m.moduleId !== moduleId
        ),
        buttonPrivileges: company.buttonPrivileges.filter(
          b => b.moduleId !== moduleId
        )
      })

    } else {

      onChange({
        ...company,
        modulePrivileges: [
          ...company.modulePrivileges,
          {
            moduleId,
            role: "O",
            modulePriority: 0,
            companyId: company.companyId
          }
        ]
      })

    }

  }

  /* ------------------------
     MENU TOGGLE
  ------------------------ */

  const toggleMenu = (moduleId: string, menuId: number) => {

    if (isView) return

    const exists = hasMenu(menuId)

    let modulePrivileges = company.modulePrivileges

    if (!hasModule(moduleId)) {

      modulePrivileges = [
        ...modulePrivileges,
        {
          moduleId,
          role: "O",
          modulePriority: 0,
          companyId: company.companyId
        }
      ]

    }

    if (exists) {

      onChange({
        ...company,
        modulePrivileges,
        menuPrivileges: company.menuPrivileges.filter(
          m => m.menuId !== menuId
        ),
        buttonPrivileges: company.buttonPrivileges.filter(
          b => b.menuId !== menuId
        )
      })

    } else {

      onChange({
        ...company,
        modulePrivileges,
        menuPrivileges: [
          ...company.menuPrivileges,
          { moduleId, menuId, companyId: company.companyId }
        ]
      })

    }

  }

  /* ------------------------
     BUTTON TOGGLE
  ------------------------ */

  const toggleButton = (
    moduleId: string,
    menuId: number,
    buttonId: string
  ) => {

    if (isView) return

    const exists = hasButton(moduleId, menuId, buttonId)

    if (exists) {

      onChange({
        ...company,
        buttonPrivileges: company.buttonPrivileges.filter(
          b =>
            !(
              b.moduleId === moduleId &&
              b.menuId === menuId &&
              b.buttonId === buttonId
            )
        )
      })

    } else {

      onChange({
        ...company,
        buttonPrivileges: [
          ...company.buttonPrivileges,
          { moduleId, menuId, buttonId, companyId: company.companyId }
        ]
      })

    }

  }

  /* ------------------------
     RENDER
  ------------------------ */

  return (

    <div
      className={`border rounded-lg p-4 space-y-4 ${
        isView ? "opacity-70 pointer-events-none" : ""
      }`}
    >

      {/* MODULES */}

      {modules.map(module => {

        const moduleMenus =
          menus.filter(m => m.moduleId === module.moduleId)

        const moduleOpen = openModules[module.moduleId]

        return (

          <Collapsible
            key={module.moduleId}
            open={moduleOpen}
            onOpenChange={(open) =>
              setOpenModules({
                ...openModules,
                [module.moduleId]: open
              })
            }
          >

            {/* MODULE */}

            <div className="flex items-center gap-2 bg-muted p-2 rounded">

              <CollapsibleTrigger asChild>
                <button className="w-4">
                  {moduleOpen
                    ? <ChevronDown size={16} />
                    : <ChevronRight size={16} />}
                </button>
              </CollapsibleTrigger>

              <Checkbox
                checked={hasModule(module.moduleId)}
                onCheckedChange={() =>
                  toggleModule(module.moduleId)
                }
              />

              <span className="font-medium">
                {module.moduleName}
              </span>

            </div>

            {/* MENUS */}

            <CollapsibleContent>

              <div className="ml-6 mt-3 space-y-3">

                {moduleMenus.map(menu => {

                  const menuButtons =
                    buttons.filter(b => b.menuId === menu.menuId)

                  const menuOpen = openMenus[menu.menuId]

                  return (

                    <Collapsible
                      key={menu.menuId}
                      open={menuOpen}
                      onOpenChange={(open) =>
                        setOpenMenus({
                          ...openMenus,
                          [menu.menuId]: open
                        })
                      }
                    >

                      {/* MENU */}

                      <div className="flex items-center gap-2 border p-2 rounded">

                        <CollapsibleTrigger asChild>
                          <button className="w-4">
                            {menuOpen
                              ? <ChevronDown size={14} />
                              : <ChevronRight size={14} />}
                          </button>
                        </CollapsibleTrigger>

                        <Checkbox
                          checked={hasMenu(menu.menuId)}
                          onCheckedChange={() =>
                            toggleMenu(
                              module.moduleId,
                              menu.menuId
                            )
                          }
                        />

                        {menu.menuName}

                      </div>

                      {/* BUTTONS */}

                      <CollapsibleContent>

                        <div className="ml-6 mt-2 space-y-2">

                          {menuButtons.map(btn => (

                            <div
                              key={btn.buttonId}
                              className="flex items-center gap-2"
                            >

                              <Checkbox
                                checked={hasButton(
                                  module.moduleId,
                                  menu.menuId,
                                  btn.buttonId
                                )}
                                onCheckedChange={() =>
                                  toggleButton(
                                    module.moduleId,
                                    menu.menuId,
                                    btn.buttonId
                                  )
                                }
                              />

                              {btn.buttonName}

                            </div>

                          ))}

                        </div>

                      </CollapsibleContent>

                    </Collapsible>

                  )

                })}

              </div>

            </CollapsibleContent>

          </Collapsible>

        )

      })}

    </div>

  )

}