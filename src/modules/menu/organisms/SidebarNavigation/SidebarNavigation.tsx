import { useState } from 'react';
import { useCurrentPath } from '@/app/hooks';
import { MenuSectionTitle } from '@/modules/menu/atoms';
import { menuItems } from '@/modules/menu/constants';
import { AccordionHeader, MenuItem } from '@/modules/menu/molecules';

const SidebarNavigation = () => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const currentPath = useCurrentPath();

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <nav className="flex flex-1 flex-col gap-6 overflow-y-auto px-4 py-5">
      {menuItems.map((section) => (
        <div key={section.id} className="space-y-2">
          <MenuSectionTitle title={section.title} />
          {section.items.map((item, index) => (
            <div key={`${section.id}-${index}`} className="space-y-2">
              {item.children ? (
                <>
                  <AccordionHeader
                    title={item.label}
                    isOpen={openAccordion === item.label}
                    onClick={() => toggleAccordion(item.label)}
                  />
                  {openAccordion === item.label && (
                    <div className="ml-3 space-y-2 border-l border-border-default pl-3">
                      {item.children.map((child) => (
                        <MenuItem
                          key={child.href}
                          label={child.label}
                          href={child.href}
                          isActive={false}
                        />
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <MenuItem
                  label={item.label}
                  href={item.href || '#'}
                  isActive={item.href === currentPath}
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
