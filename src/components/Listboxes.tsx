'use client'
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'

export function DataListbox({
  name,
  data,
  selectedValue,
}: {
  name: string,
  data: Array<{
    name: string,
  }>,
  selectedValue?: string
}) {
  // select index where value equals to selected value otherwise return 0
  const index: number = selectedValue ? data.findIndex(x => x.name === selectedValue) : 0;
  const [selected, setSelected] = useState(data[index]);

  return (
    <Listbox value={selected} onChange={setSelected} name={name}>
      <div className="relative mt-1">
        <Listbox.Button className="bg-[#f1f1f1] dark:bg-[#1f1f1f] border 
                      border-[#c2c2c2] dark:border-[#2c2c2c] text-text text-left p-2 rounded-lg w-full">
          <span className="block truncate">{selected.name}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>

          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute bg-[#f1f1f1] dark:bg-[#1f1f1f] border 
                      border-[#c2c2c2] dark:border-[#2c2c2c] text-text p-2 rounded-lg w-full z-10">
            {data.map((value, id) => (
              <Listbox.Option
                key={id}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${active && 'bg-primary text-text'}`
                }
                value={value}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                        }`}
                    >
                      {value.name}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-accent">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>

                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
