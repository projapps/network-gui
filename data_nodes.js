require('./data_topology');
require('./data_cpu');
require('./data_network');
require('./data_ports');

nodes = ['a', 'b', 'c', 'd', 'e', 'f'];
cpuData = [cpuData_a, cpuData_b, cpuData_c, cpuData_d, cpuData_e, cpuData_f, cpuData_overall];
networkData = [networkData_a, networkData_b, networkData_c, networkData_d, networkData_e, networkData_f, networkData_overall];
throughputData = [throughputData_a, throughputData_b];
latencyData = [latencyData_a, latencyData_b];
dropPacketData = [dropPacketData_a, dropPacketData_b];
