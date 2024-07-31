import { list, group } from "@keystone-6/core";
import { allowAll, allOperations } from "@keystone-6/core/access";
import { bigInt, file, integer, relationship, select, text, timestamp } from "@keystone-6/core/fields";
import { persianCalendar } from "../src/custom-fields/persian-calander";
import { Lists } from '.keystone/types'
import { getRoleFromArgs, isMemberOfAdminGroup, Roles, } from "../data/types";

export const Contract = list<Lists.Contract.TypeInfo<any>>({
  access: {
    operation: {
      ...allOperations(isMemberOfAdminGroup),
      query: () => true
    },
  },
  ui: {
    label: 'قرارداد',
  },
  fields: {
    title: text({
      label: 'عنوان',
    }),
    description: text({
      label: 'توضیحات',
      ui: {
        displayMode: 'textarea'
      }
    }),
    ...group({
      label: 'تاریخ قرارداد',
      fields: {
        startFrom: persianCalendar({
          label: 'از تاریخ',
        }),
        end: persianCalendar({
          label: 'تا تاریخ',
        }),
      }
    }),
    cost: bigInt({
      label: 'مبلغ قرارداد',
      ui: {
        views: "./src/custome-fields-view/bigint-with-farsi-letters.tsx"
      }
    }),
    contractor: relationship({
      label: 'پیمانکار',
      ref: 'Constractor.contracts',
    }),
    attachment: file({
      // temp hidden
      ui: {
        itemView: {
          fieldMode: 'hidden'
        },
        createView: { fieldMode: 'hidden' }
      },
      storage: "file",
    }),
  },
});
