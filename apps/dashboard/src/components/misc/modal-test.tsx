"use client";

import {
  ResponsiveModal,
  ResponsiveModalFooter,
  ResponsiveModalPresets,
  Button,
  Input,
  Label,
} from "@repo/components";
import { useState } from "react";
import { Plus, Trash2, Edit } from "lucide-react";

export default function TestModalPage() {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  return (
    <div className="space-y-6 p-8">
      <div>
        <h1 className="text-3xl font-bold">Modal Examples</h1>
        <p className="text-muted-foreground">
          Test different modal configurations
        </p>
      </div>

      <div className="flex flex-wrap gap-4">
        <ResponsiveModal
          trigger={<Button className="text-white">Open Modal</Button>}
          title="Basic Modal"
          description="This is a basic modal that works on desktop and mobile"
          size="xl"
          //   scrollBehavior="outside"
          //   maxHeight="90vh"
        >
          <p>Your content goes here</p>
        </ResponsiveModal>
        <Button onClick={() => setOpenAdd(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>

        <Button variant="outline" onClick={() => setOpenEdit(true)}>
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </Button>

        <Button variant="destructive" onClick={() => setOpenDelete(true)}>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </div>

      {/* Add Modal */}
      <ResponsiveModal
        open={openAdd}
        onOpenChange={setOpenAdd}
        title="Add New Order"
        description="Create a new fuel order"
      >
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="order-id">Order ID</Label>
            <Input id="order-id" placeholder="ORD-12345" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gallons">Gallons</Label>
            <Input id="gallons" type="number" placeholder="500" />
          </div>

          <ResponsiveModalFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpenAdd(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Create Order</Button>
          </ResponsiveModalFooter>
        </form>
      </ResponsiveModal>

      {/* Edit Modal */}
      <ResponsiveModal
        open={openEdit}
        onOpenChange={setOpenEdit}
        title="Edit Order"
        description="Update order details"
        size="md"
        closeOnOverlayClick={false}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Order ID</Label>
            <Input defaultValue="ORD-98745" />
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <select className="w-full rounded-md border px-3 py-2">
              <option>In Transit</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </select>
          </div>

          <ResponsiveModalFooter>
            <Button variant="outline" onClick={() => setOpenEdit(false)}>
              Cancel
            </Button>
            <Button>Save Changes</Button>
          </ResponsiveModalFooter>
        </div>
      </ResponsiveModal>

      {/* Delete Confirmation */}
      <ResponsiveModal
        open={openDelete}
        onOpenChange={setOpenDelete}
        title="Delete Order"
        description="Are you sure you want to delete this order? This action cannot be undone."
        {...ResponsiveModalPresets.confirmation}
      >
        <ResponsiveModalFooter>
          <Button variant="outline" onClick={() => setOpenDelete(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              console.log("Deleted!");
              setOpenDelete(false);
            }}
          >
            Delete
          </Button>
        </ResponsiveModalFooter>
      </ResponsiveModal>
    </div>
  );
}
