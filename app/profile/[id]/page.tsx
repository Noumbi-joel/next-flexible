import { getUserProjects } from "@/lib/actions";
import { UserProfile } from "@/types";
import React from "react";
import { Profile } from "@/components";

type Props = {
  params: {
    id: string;
  };
};

export default async function ProfilePage({ params }: Props) {
  const result = (await getUserProjects(params.id, 100)) as {
    user: UserProfile;
  };

  if(!result?.user){
    return <p className="no-result-text">Failed to fetch user info</p>
  }

  return <Profile user={result?.user} />;
}
