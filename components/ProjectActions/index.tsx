"use client";

import { deleteProject, fetchToken } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

type Props = {
  projectId: string;
};

function ProjectActions({ projectId }: Props) {
  const [isDeleting, setIsDeleting] = React.useState(false);
  const router = useRouter();

  const handleDeleteProject = async () => {
    const { token } = await fetchToken();

    setIsDeleting(true);

    try {
      await deleteProject(projectId, token).then(() => router.push("/"));
    } catch (error) {
      console.log("Error while deleting project: " + error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Link
        href={`/edit-project/${projectId}`}
        className="flexCenter edit-action_btn"
      >
        <Image src={"/pencile.svg"} width={15} height={15} alt="edit" />
      </Link>

      <button
        onClick={handleDeleteProject}
        className={`flexCenter delete-action_btn ${
          isDeleting ? "bg-gray" : "bg-primary-purple"
        } `}
      >
        <Image src={"/trash.svg"} width={15} height={15} alt="delete" />
      </button>
    </>
  );
}

export default ProjectActions;
