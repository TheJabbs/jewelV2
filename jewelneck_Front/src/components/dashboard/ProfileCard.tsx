
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Customer } from '@/types/dashboard';
import { User, Mail, Phone } from 'lucide-react';

interface ProfileCardProps {
  customer: Customer;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ customer }) => {
  return (
    <Card className="shadow-soft">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-display">Profile Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-gold-dark" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Username</p>
              <p className="font-medium">{customer.username}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-gold-dark" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p className="font-medium">{customer.email}</p>
            </div>
          </div>
          {customer.phone && (
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-gold-dark" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Phone</p>
                <p className="font-medium">{customer.phone}</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
