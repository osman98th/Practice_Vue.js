<script>
import {
    onMounted,
    ref
} from "vue";
import DashboardCard from "@/components/DashboardCard.vue";

const vehicles = ref([{
    id: 1
}, {
    id: 2
}]);
const drivers = ref([{
    id: 1
}, {
    id: 2
}, {
    id: 3
}]);
const bookings = ref([{
    id: 1
}, {
    id: 2
}]);
const trips = ref([{
    id: 1
}]);

onMounted(() => {
    console.log("Dashboard mounted ✅");
});
</script>
