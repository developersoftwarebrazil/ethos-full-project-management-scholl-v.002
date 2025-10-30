import Image from "next/image";
import Link from "next/link";
import FormModel from "@/components/Forms/FormModel";
import { UserData } from "@/lib/types/userData";
import { role } from "@/lib/data";

export default function UserRow({ user }: { user: UserData }) {
  return (
    <tr
      key={user.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      {/* Info */}
      <td className="flex items-center gap-4 p-4">
        <Image
          src={user.img || "/noAvatar.png"}
          alt={`Foto de ${user.first_name} ${user.last_name}`}
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold uppercase">{user.first_name} {user.last_name}</h3>
          <p className="text-xs text-gray-500">{user.email}</p>
        </div>
      </td>

      <td className="hidden md:table-cell lowercase">{user.username}</td>
      <td className="hidden md:table-cell lowercase">{user.roles.join(", ") || "-"}</td>
      <td className="hidden md:table-cell lowercase">{user.subjects?.join(", ") || "-"}</td>
      <td className="hidden md:table-cell">{user.phone || "-"}</td>
      <td className="hidden md:table-cell">{user.address || "-"}</td>
      <td className="hidden md:table-cell">
        {user.birthday ? new Date(user.birthday).toLocaleDateString("pt-BR") : "-"}
      </td>

      {/* Ações */}
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/users/${user.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
              <Image src="/view.png" alt="Visualizar" width={16} height={16} />
            </button>
          </Link>

          {role === "admin" && (
            <FormModel table="user" type="delete" id={user.id} />
          )}
        </div>
      </td>
    </tr>
  );
}
