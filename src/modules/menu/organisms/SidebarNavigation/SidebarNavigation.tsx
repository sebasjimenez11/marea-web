import { useState } from 'react';
import { matchPath, useLocation } from 'react-router-dom';
import { MenuSectionTitle } from '@/modules/menu/atoms';
import { menuItems } from '@/modules/menu/constants';
import { AccordionHeader, MenuItem } from '@/modules/menu/molecules';

const SidebarNavigation = () => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const { pathname } = useLocation();

  const isPathActive = (href: string) =>
    pathname === href || Boolean(matchPath({ path: `${href}/*`, end: false }, pathname));

  const toggleAccordion = (id: string) => {
    setOpenAccordion((currentValue) => (currentValue === id ? null : id));
  };

  return (
    <nav className="flex flex-1 flex-col gap-6 overflow-y-auto px-4 py-5">
      {menuItems.map((section) => (
        <div key={section.id} className="space-y-2">
          <MenuSectionTitle title={section.title} />
          {section.items.map((item, index) => (
            <div key={`${section.id}-${index}`} className="space-y-2">
              {item.children ? (
                (() => {
                  const hasActiveChild = item.children.some((child) => isPathActive(child.href));
                  const accordionKey = `${section.id}-${item.label}`;
                  const isAccordionOpen =
                    openAccordion === accordionKey || (openAccordion === null && hasActiveChild);

                  return (
                    <>
                      <AccordionHeader
                        title={item.label}
                        isOpen={isAccordionOpen}
                        onClick={() => toggleAccordion(accordionKey)}
                      />
                      {isAccordionOpen && (
                        <div className="ml-3 space-y-2 border-l border-border-default pl-3">
                          {item.children.map((child) => (
                            <MenuItem
                              key={child.href}
                              label={child.label}
                              href={child.href}
                              isActive={isPathActive(child.href)}
                            />
                          ))}
                        </div>
                      )}
                    </>
                  );
                })()
              ) : (
                <MenuItem
                  label={item.label}
                  href={item.href || '#'}
                  isActive={item.href ? isPathActive(item.href) : false}
                />
              )}
            </div>
          ))}
        </div>
      ))}
    </nav>
  );
};

export default SidebarNavigation;
