import { Modal, ProjectForm } from "@/components";
import { getProjectDetails } from "@/lib/actions";
import { getCurrentUser } from "@/lib/session";
import { ProjectInterface } from "@/types";
import { redirect } from "next/navigation";
import React from "react";

export default async function EditProject({
  params: { id },
}: {
  params: { id: string };
}) {
  const session = await getCurrentUser();

  if (!session?.user) redirect("/");

  const result = (await getProjectDetails(id)) as {
    project?: ProjectInterface;
  };

  return (
    <Modal>
      <h3 className="modal-head-text">Edit Project</h3>

      <ProjectForm type="edit" session={session} project={result?.project} />
    </Modal>
  );
}
