"use server"
import {client} from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
export const onGetSubscriptionPlan=async()=>{
    try{
      const user=await currentUser();
      if(!user)return;
      const plan=await client.user.findUnique({
        where:{
            clerkId:user.id
        },
        select:{
            subscription:{
                select:{
                    plan:true
                }
            }
        }
      });
      if(plan){
         return plan.subscription?.plan
      }  
    }
    catch(error:any){
        console.log(error);
    }
}

export const onGetAllAccountDomains=async()=>{
    const user=await currentUser();
    if(!user)return;
    try{
        const domains=await client.user.findUnique({
            where:{
                clerkId:user.id
            },
            select:{
                id:true,
                domains:{
                    select:{
                        name:true,
                        icon:true,
                        id:true,
                        customer:{
                            select:{
                              chatRoom:{
                                select:{
                                    id:true,
                                    live:true
                                }
                              }
                            }
                        }
                    }
                }
            }
        })
        return {...domains}
    }
    catch(error:any){
        console.log(error);
    }
}
export const onIntegrateDomain=async(domain:string,icon:string)=>{
    const user=await currentUser(); 
    if(!user)return ;
    try{
        const subscription=await client.user.findUnique({
            where:{
                clerkId:user.id
            },
            select:{
                _count:{
                   select:{
                    domains:true
                   }
                },
                subscription:{
                    select:{
                        plan:true
                    }
                }
            }
        })
        const domainExists=await client.user.findFirst({
            where:{
                clerkId:user.id,
                domains:{
                    some:{
                        name:domain
                    }
                }
            }
        });
        if(!domainExists){
            if(
                (subscription?.subscription?.plan=="STANDARD"&&
                    subscription._count.domains<1)||
                    (subscription?.subscription?.plan=="PRO"&&
                        subscription._count.domains<5
                    )||
                    (
                        subscription?.subscription?.plan=="ULTIMATE"&&
                        subscription._count.domains<10
                    )
            ){
                const newDomain=await client.user.update({
                    where:{
                        clerkId:user.id
                    },
                    data:{
                        domains:{
                            create:{
                                name:domain,
                                icon,
                                chatBot:{
                                    create:{
                                        welcomeMessage:"Hey,There have a question?Text as here"
                                    }
                                }
                            }
                        }
                    }
                });
                if(newDomain){
                    return {status:200,message:"Domain successfully added"}
                }
            }
            else{
                return{
                    status:400,
                    message:"You Reached the maximu number of domains,upgrade your plan"
                }
            }
        }
        return {status:400,message:'Domain already exists'}
    }
    catch(error:any){
        console.log(error);
    }
}