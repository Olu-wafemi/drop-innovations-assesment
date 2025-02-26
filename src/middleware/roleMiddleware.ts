export const authorizeRole = (roles: string[])=>{
    return (req: any, res: any, next: any)=>{

        if(!roles.includes(req.user.role)){
             res.status(403).json({ message: "Invalid Access"});
             return

        }
        next();
    }
}