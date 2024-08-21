import { Roles } from "./types"

export namespace Match {
    export function AclRole(key: string) {


        switch (key) {
            case 'confirmedByTheUploader':
                return 'مسئول کارگاه'

            case 'confirmedByFinancialSupervisor':
                return 'ناظر مالی'

            case 'confirmedByTechnicalSupervisor':
                return 'ناظر فنی'

            case 'confirmedByProjectControlSupervisor':
                return 'ناظر کنترل پروژه'

            case 'confirmedBySupervisor':

                return 'سرپرست کل'

            default:
                return '[undefined]'
        }
    }

    export function Role(key: Roles) {

        switch (key) {
            case Roles.admin:
                return "ادمین سیستم"
            case Roles.financial:
                return "مالی"
            case Roles.technical:
                return "فنی"
            case Roles.projectControl:
                return "کنترل پروژه"
            case Roles.supervisor:
                return "سرپرست"
            case Roles.operator:
                return "اپراتور"
            case Roles.workshop:
                return "کارگاه"
            case Roles.guest:
                return "مهمان"
            default:
                break;
        }
    }
}